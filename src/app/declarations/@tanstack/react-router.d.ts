import type { router } from '~/app/router'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }

  // Дополнение: статичные данные маршрутов, которые читает лейаут.
  interface StaticDataRouteOption {
    /** Экран без навигации до lg (полноэкранный режим теста): закрывается своей кнопкой на странице. */
    focusMode?: boolean
  }
}
