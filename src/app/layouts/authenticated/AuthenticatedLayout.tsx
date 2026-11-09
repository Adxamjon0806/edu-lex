import { Outlet } from '@tanstack/react-router'

import { AuthenticatedSidebar } from '~/widgets/authenticated-sidebar'

/*
 * Сетка из макета: до md навигация — нижняя панель, прилипающая к низу экрана; с md — колонка слева
 * на всю высоту экрана: 88px, с lg — 248px. Отступы контента из макета: 18/20/24px на мобильном,
 * 32px на планшете, 32/40px на десктопе.
 */
export function AuthenticatedLayout() {
  return (
    <div className="flex flex-1 flex-col md:grid md:grid-cols-[--spacing(22)_1fr] lg:grid-cols-[--spacing(62)_1fr]">
      <div className="sticky bottom-0 z-10 order-last md:top-0 md:order-first md:h-dvh">
        <AuthenticatedSidebar />
      </div>
      <div className="flex flex-1 flex-col px-5 pt-4.5 pb-6 md:p-8 lg:px-10">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
