import type { router } from '~/app/router'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }

  // Дополнение: статичные данные маршрутов, которые читает лейаут.
  interface StaticDataRouteOption {
    /** Тёмно-синий фон страницы в обеих темах (подписка): в бандле у неё только тёмный вид. */
    darkPage?: boolean
    /** Экран без навигации до lg (полноэкранный режим теста): закрывается своей кнопкой на странице. */
    focusMode?: boolean
  }
}
