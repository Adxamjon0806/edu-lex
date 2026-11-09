import { QueryClient, QueryClientProvider, queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
  type RouteComponent,
} from '@tanstack/react-router'
import { http, HttpResponse } from 'msw'
import { expect, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import { userEvent } from 'vitest/browser'

import type { worker as browserWorker } from '~/mocks/browser'
import { test } from '~/mocks/test-extend'

import { ErrorPage } from './ErrorPage'

async function fetchGreeting() {
  const response = await fetch('/api/greeting')

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`)
  }

  return response.text()
}

const greeting = queryOptions({ queryFn: fetchGreeting, queryKey: ['greeting'] })

// Первый запрос падает, следующие успешны: так проверяем, что повтор загружает данные заново.
function failFirstRequest(worker: typeof browserWorker) {
  worker.use(http.get('/api/greeting', () => HttpResponse.text('Hello')))
  worker.use(http.get('/api/greeting', () => new HttpResponse(null, { status: 500 }), { once: true }))
}

function Greeting() {
  const { data } = useSuspenseQuery(greeting)

  return <p>{data}</p>
}

function LoaderData() {
  return <p>Loaded</p>
}

// ErrorPage у корневого маршрута, как в приложении (src/app/routes/__root.tsx): ошибка дочернего маршрута
// поднимается к нему.
async function renderRoute(options: { component?: RouteComponent; loader?: () => Promise<string> }) {
  const rootRoute = createRootRoute({ errorComponent: ErrorPage })
  const indexRoute = createRoute({ ...options, getParentRoute: () => rootRoute, path: '/' })
  const router = createRouter({
    history: createMemoryHistory(),
    routeTree: rootRoute.addChildren([indexRoute]),
  })
  // retry: false — ошибка запроса сразу доходит до страницы ошибки.
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  )
}

test('shows the error page and reloads the route on retry when the loader fails', async ({ worker }) => {
  failFirstRequest(worker)
  const screen = await renderRoute({ component: LoaderData, loader: fetchGreeting })

  await expect.element(screen.getByRole('heading', { name: 'Something went wrong' })).toBeVisible()
  await screen.getByRole('button', { name: 'Try again' }).click()

  await expect.element(screen.getByText('Loaded')).toBeVisible()
})

test('loads a failed suspense query again on retry', async ({ worker }) => {
  failFirstRequest(worker)
  const screen = await renderRoute({ component: Greeting })

  await expect.element(screen.getByRole('heading', { name: 'Something went wrong' })).toBeVisible()
  await screen.getByRole('button', { name: 'Try again' }).click()

  await expect.element(screen.getByText('Hello')).toBeVisible()
})

test('retries from the keyboard', async ({ worker }) => {
  failFirstRequest(worker)
  const screen = await renderRoute({ component: Greeting })
  const retryButton = screen.getByRole('button', { name: 'Try again' })
  await expect.element(retryButton).toBeVisible()

  await userEvent.tab()
  await expect.element(retryButton).toHaveFocus()
  await userEvent.keyboard('{Enter}')

  await expect.element(screen.getByText('Hello')).toBeVisible()
})

test('announces the error with its message in development', async ({ worker }) => {
  failFirstRequest(worker)
  const screen = await renderRoute({ component: Greeting })
  const alert = screen.getByRole('alert')

  await expect.element(alert.getByRole('heading', { name: 'Something went wrong' })).toBeVisible()
  await expect.element(alert.getByText('Request failed with status 500')).toBeVisible()
  // Кнопка вне alert: роль alert только для текста.
  await expect.element(alert.getByRole('button')).not.toBeInTheDocument()
})

test('hides the error message in production', async ({ worker }) => {
  vi.stubEnv('DEV', false)
  failFirstRequest(worker)
  const screen = await renderRoute({ component: Greeting })

  await expect.element(screen.getByRole('heading', { name: 'Something went wrong' })).toBeVisible()
  await expect.element(screen.getByText('Request failed with status 500')).not.toBeInTheDocument()
})
