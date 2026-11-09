import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext } from '@tanstack/react-router'

import { RootErrorLayout, RootLayout } from '~/app/layouts'

// Контекст роутера, доступный в beforeLoad и loader всех маршрутов; значения передаёт createRouter({ context }).
interface RouterContext {
  // Через него loader заранее загружает данные в кэш TanStack Query, а компонент читает их тем же запросом.
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  // Страница ошибки в корне, как страница 404 (notFoundMode: 'root' в src/app/router): у остальных маршрутов
  // нет своего errorComponent, поэтому ошибка любого из них поднимается сюда и заменяет всю страницу.
  errorComponent: RootErrorLayout,
})
