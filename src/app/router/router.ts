import { createRouter } from '@tanstack/react-router'

import { NotFoundPage } from '~/pages/not-found'

import { queryClient } from '~/shared/api'

import { routeTree } from './generatedRouteTree'

export const router = createRouter({
  // Тот же клиент, что в QueryClientProvider: loader и компоненты работают с одним кэшем.
  context: { queryClient },
  // Страница для адресов, которым не соответствует ни один маршрут.
  defaultNotFoundComponent: NotFoundPage,
  // Селекторы (useSearch, useLoaderData и т. п.) возвращают прежние ссылки на неизменившиеся данные,
  // поэтому компонент не перерисовывается, если выбранные данные не изменились.
  defaultStructuralSharing: true,
  // Переходы между страницами выполняются через document.startViewTransition(); браузеры без поддержки
  // переходят без анимации.
  defaultViewTransition: true,
  // Неизвестный адрес показывает страницу 404 корневого маршрута, а не ближайшего совпавшего родителя
  // (по умолчанию 'fuzzy').
  notFoundMode: 'root',
  routeTree,
  // Восстанавливаем позицию прокрутки при переходах назад и вперёд (по умолчанию выключено).
  scrollRestoration: true,
})
