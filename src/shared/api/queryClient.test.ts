import {
  focusManager,
  MutationObserver,
  QueryObserver,
  queryOptions,
  type MutationOptions,
  type QueryKey,
} from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { http, HttpResponse } from 'msw'
import { beforeEach, describe, expect, onTestFinished, test, vi } from 'vitest'

import { server } from '~/mocks/node'

import { queryClient } from './queryClient'

const todos = queryOptions({ queryFn: () => ['all'], queryKey: ['todos'] })
const todo = queryOptions({ queryFn: () => ['one'], queryKey: ['todos', 1] })
const users = queryOptions({ queryFn: () => ['user'], queryKey: ['users'] })
// Запрос без данных в кэше: загружается при любом staleTime.
const profile = queryOptions({ queryFn: () => ['profile'], queryKey: ['profile'] })

function invalidatedQueries() {
  return {
    todo: isInvalidated(todo.queryKey),
    todos: isInvalidated(todos.queryKey),
    users: isInvalidated(users.queryKey),
  }
}

function isInvalidated(queryKey: QueryKey) {
  return queryClient.getQueryState(queryKey)?.isInvalidated
}

// Мутация выполняется так же, как через useMutation, но без React.
function mutate(options: MutationOptions) {
  return new MutationObserver(queryClient, options).mutate()
}

// Клиент общий для всех тестов файла: очищаем кэш и заполняем его заново, чтобы каждый тест начинал с одних данных.
beforeEach(() => {
  queryClient.clear()
  queryClient.setQueryData(todos.queryKey, ['all'])
  queryClient.setQueryData(todo.queryKey, ['one'])
  queryClient.setQueryData(users.queryKey, ['user'])
})

describe('invalidation after a mutation', () => {
  test.for([
    {
      expected: { todo: true, todos: true, users: false },
      invalidates: [todos.queryKey],
      name: 'queries whose key starts with the listed key',
    },
    {
      expected: { todo: true, todos: false, users: false },
      invalidates: [todo.queryKey],
      name: 'only the query with the longer listed key, not its prefix',
    },
    {
      expected: { todo: true, todos: true, users: true },
      invalidates: [todos.queryKey, users.queryKey],
      name: 'queries for every listed key',
    },
    {
      expected: { todo: false, todos: false, users: false },
      invalidates: [],
      name: 'nothing when the list is empty',
    },
  ])('invalidates $name', async ({ expected, invalidates }) => {
    await mutate({ meta: { invalidates }, mutationFn: () => Promise.resolve() })

    expect(invalidatedQueries()).toStrictEqual(expected)
  })

  test.for([
    { meta: undefined, name: 'no meta' },
    { meta: {}, name: 'no invalidates in meta' },
  ])('invalidates all queries when the mutation has $name', async ({ meta }) => {
    await mutate({ meta, mutationFn: () => Promise.resolve() })

    expect(invalidatedQueries()).toStrictEqual({ todo: true, todos: true, users: true })
  })

  test('keeps the mutation pending until active queries are refetched', async () => {
    let finishRefetch: () => void = () => undefined
    const queryFn = vi.fn(
      () =>
        new Promise<string[]>((resolve) => {
          finishRefetch = () => {
            resolve(['updated'])
          }
        }),
    )
    // Подписчик делает запрос активным, как смонтированный useQuery; staleTime исключает загрузку при подписке.
    const observer = new QueryObserver(queryClient, { ...todos, queryFn, staleTime: Infinity })
    onTestFinished(observer.subscribe(() => undefined))
    const mutation = new MutationObserver(queryClient, {
      meta: { invalidates: [todos.queryKey] },
      mutationFn: () => Promise.resolve(),
    })

    const mutated = mutation.mutate()
    await vi.waitFor(() => {
      expect(queryFn).toHaveBeenCalledOnce()
    })
    expect(mutation.getCurrentResult().isPending).toBe(true)

    finishRefetch()
    await mutated
    expect(mutation.getCurrentResult().isSuccess).toBe(true)
    expect(queryClient.getQueryData(todos.queryKey)).toStrictEqual(['updated'])
  })

  test('resolves the mutation when refetching a query fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
    // retry: false — иначе retry из defaultOptions клиента повторял бы упавший запрос с задержкой.
    const observer = new QueryObserver(queryClient, {
      ...todos,
      queryFn: () => Promise.reject(new Error('Failed to load')),
      retry: false,
      staleTime: Infinity,
    })
    onTestFinished(observer.subscribe(() => undefined))

    await expect(
      mutate({ meta: { invalidates: [todos.queryKey] }, mutationFn: () => Promise.resolve('saved') }),
    ).resolves.toBe('saved')
    expect(queryClient.getQueryState(todos.queryKey)?.status).toBe('error')
  })

  test('does not invalidate queries when the mutation fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)

    await expect(mutate({ mutationFn: () => Promise.reject(new Error('Failed to save')) })).rejects.toThrow(
      'Failed to save',
    )

    expect(invalidatedQueries()).toStrictEqual({ todo: false, todos: false, users: false })
  })
})

test('does not refetch stale active queries when the window regains focus', async () => {
  // Подписываем клиент на события фокуса, как это делает QueryClientProvider.
  queryClient.mount()
  onTestFinished(() => {
    queryClient.unmount()
    // Без аргумента focusManager снова определяет фокус сам, как до теста.
    focusManager.setFocused()
  })
  const queryFn = vi.fn(() => ['updated'])
  // staleTime: 0 делает данные из beforeEach устаревшими, иначе фокус не вызвал бы загрузку и без настройки;
  // refetchOnMount: false исключает загрузку при подписке.
  const observer = new QueryObserver(queryClient, { ...users, queryFn, refetchOnMount: false, staleTime: 0 })
  onTestFinished(observer.subscribe(() => undefined))

  focusManager.setFocused(false)
  focusManager.setFocused(true)
  // Клиент перезагружает запросы после фокуса асинхронно; ждём следующей макрозадачи.
  await new Promise((resolve) => setTimeout(resolve))

  expect(queryFn).not.toHaveBeenCalled()
})

describe('retry of a failed query', () => {
  // Node.js принимает только абсолютный URL; ответы задаёт MSW.
  const url = 'https://api.example.com/profile'

  function requestProfile(response: () => Response) {
    server.use(http.get(url, response))
    const queryFn = vi.fn(async () => (await axios.get<string[]>(url)).data)
    // retryDelay: 0 — повторы без задержки; число повторов берётся из defaultOptions клиента.
    const query = queryClient.query({ ...profile, queryFn, retryDelay: 0 })

    return { query, queryFn }
  }

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
  })

  test.for([400, 401, 403, 404, 422])('does not retry a response with status %i', async (status) => {
    const { query, queryFn } = requestProfile(() => new HttpResponse(null, { status }))

    await expect(query).rejects.toThrow(AxiosError)
    expect(queryFn).toHaveBeenCalledOnce()
  })

  test.for([408, 429, 500, 503])('retries a response with status %i three times', async (status) => {
    const { query, queryFn } = requestProfile(() => new HttpResponse(null, { status }))

    await expect(query).rejects.toThrow(AxiosError)
    expect(queryFn).toHaveBeenCalledTimes(4)
  })

  test('retries a network error three times', async () => {
    const { query, queryFn } = requestProfile(() => HttpResponse.error())

    await expect(query).rejects.toThrow(AxiosError)
    expect(queryFn).toHaveBeenCalledTimes(4)
  })

  test('retries an error not from axios three times', async () => {
    const queryFn = vi.fn(() => Promise.reject(new Error('Failed to load')))

    await expect(queryClient.query({ ...profile, queryFn, retryDelay: 0 })).rejects.toThrow('Failed to load')
    expect(queryFn).toHaveBeenCalledTimes(4)
  })
})

test.for([
  { elapsed: 29_999, expected: ['user'], name: 'uses cached data for 30 seconds' },
  { elapsed: 30_000, expected: ['updated'], name: 'refetches cached data after 30 seconds' },
])('$name', async ({ elapsed, expected }) => {
  const updatedAt = Date.now()
  queryClient.setQueryData(users.queryKey, ['user'], { updatedAt })
  vi.setSystemTime(updatedAt + elapsed)

  await expect(queryClient.query({ ...users, queryFn: () => ['updated'] })).resolves.toStrictEqual(expected)
})

test('logs a failed query with its error, key and meta', async () => {
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)
  const error = new Error('Failed to load')
  const meta = { feature: 'profile' }

  await expect(
    queryClient.query({ ...profile, meta, queryFn: () => Promise.reject(error), retry: false }),
  ).rejects.toBe(error)

  expect(consoleError).toHaveBeenCalledExactlyOnceWith('[React Query Error]', error, {
    meta,
    queryKey: profile.queryKey,
  })
})

test('logs a failed mutation with its error, key and meta', async () => {
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)
  const error = new Error('Failed to save')
  const meta = { invalidates: [users.queryKey] }
  const mutationKey = ['users', 'update']

  await expect(mutate({ meta, mutationFn: () => Promise.reject(error), mutationKey })).rejects.toBe(error)

  expect(consoleError).toHaveBeenCalledExactlyOnceWith('[React Query Mutation Error]', error, { meta, mutationKey })
})
