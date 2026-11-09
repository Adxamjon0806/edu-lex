import { matchQuery, MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

// Единственный клиент приложения: создаётся один раз на уровне модуля, а не в компоненте,
// иначе при каждом рендере кэш создавался бы заново.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Не перезапрашиваем данные при возврате на вкладку (по умолчанию true).
      refetchOnWindowFocus: false,
      // Ответ 4xx при повторе не изменится, поэтому не повторяем его, а сразу показываем ошибку
      // (повторы со стандартной задержкой 1 + 2 + 4 с отложили бы её примерно на 7 с).
      // Исключения — 408 и 429: сервер не успел обработать запрос или просит повторить позже.
      // Сетевые ошибки (ответа нет), 5xx и ошибки не от axios повторяем стандартные 3 раза.
      retry: (failureCount, error) => {
        if (isAxiosError(error) && error.response) {
          const { status } = error.response

          if (status < 500 && status !== 408 && status !== 429) {
            return false
          }
        }

        return failureCount < 3
      },
      // Данные считаются свежими 30 с: компоненты, смонтированные за это время, берут их из кэша
      // без повторного запроса (по умолчанию 0 — запрос при каждом монтировании).
      staleTime: 30_000,
    },
  },
  mutationCache: new MutationCache({
    // Как и для запросов (см. queryCache ниже), логируем ошибку один раз здесь, а не в каждом компоненте.
    onError: (error, _variables, _onMutateResult, mutation) => {
      console.error('[React Query Mutation Error]', error, {
        meta: mutation.meta,
        mutationKey: mutation.options.mutationKey,
      })
    },
    // Автоматическая инвалидация после успешной мутации. Какие запросы инвалидировать, мутация задаёт
    // в meta.invalidates (тип — в src/app/declarations/@tanstack/react-query.d.ts): запросы, ключ которых
    // начинается с одного из перечисленных ключей. Без meta.invalidates инвалидируются все запросы,
    // с пустым массивом — ни один.
    onSuccess: async (_data, _variables, _onMutateResult, mutation, { client }) => {
      // Дожидаемся повторной загрузки активных запросов: мутация остаётся в isPending, пока данные не обновятся,
      // и интерфейс не показывает устаревшие данные. Ошибка повторной загрузки мутацию не проваливает:
      // invalidateQueries её не пробрасывает, она попадает в сам запрос.
      await client.invalidateQueries({
        predicate: (query) => mutation.meta?.invalidates?.some((queryKey) => matchQuery({ queryKey }, query)) ?? true,
      })
    },
  }),
  // TanStack Query v5 сам ошибки запросов и мутаций не логирует; логируем их здесь один раз на запрос,
  // а не в каждом компоненте, который использует запрос.
  queryCache: new QueryCache({
    onError: (error, query) => {
      // Передаём саму ошибку, а не только message: в консоли будет стек, а значение, выброшенное queryFn
      // не как Error, не потеряется.
      console.error('[React Query Error]', error, { meta: query.meta, queryKey: query.queryKey })
    },
  }),
})
