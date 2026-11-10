import { Outlet, useMatches } from '@tanstack/react-router'

import { AuthenticatedSidebar } from '~/widgets/authenticated-sidebar'

import { classNames } from '~/shared/lib'

/*
 * Сетка из макета: до md навигация — нижняя панель, прилипающая к низу экрана; с md — колонка слева
 * на всю высоту экрана: 88px, с lg — 248px. Отступы контента из макета: 18/20/24px на мобильном,
 * 32px на планшете, 32/40px на десктопе.
 * Полноэкранный режим (staticData.focusMode, например тест): до lg навигации и отступов нет, страница
 * рисует свою шапку на всю ширину; на десктопе всё как обычно.
 */
export function AuthenticatedLayout() {
  const focusMode = useMatches({ select: (matches) => matches.some((match) => match.staticData.focusMode) })

  return (
    <div
      className={classNames(
        'flex flex-1 flex-col lg:grid lg:grid-cols-[--spacing(62)_1fr]',
        !focusMode && 'md:grid md:grid-cols-[--spacing(22)_1fr]',
      )}
    >
      <div
        className={classNames(
          'sticky bottom-0 z-10 order-last md:top-0 md:order-first md:h-dvh',
          focusMode && 'max-lg:hidden',
        )}
      >
        <AuthenticatedSidebar />
      </div>
      <div className={classNames('flex flex-1 flex-col lg:px-10 lg:py-8', !focusMode && 'px-5 pt-4.5 pb-6 md:p-8')}>
        <main className="flex flex-1 flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
