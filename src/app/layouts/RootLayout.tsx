import type { PropsWithChildren } from 'react'

// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Outlet, type ErrorComponentProps } from '@tanstack/react-router'

// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { ErrorPage } from '~/pages/error'

// errorComponent корневого маршрута отрисовывается вместо RootLayout целиком, поэтому оборачиваем страницу
// ошибки в ту же обёртку: она выглядит так же, как страница 404, которая показывается внутри RootLayout.
export function RootErrorLayout(props: Readonly<ErrorComponentProps>) {
  return (
    <RootShell>
      <ErrorPage {...props} />
    </RootShell>
  )
}

export function RootLayout() {
  return (
    <RootShell>
      <Outlet />
    </RootShell>
  )
}

// Общая обёртка всех страниц корня: и обычных (в том числе страницы 404), и страницы ошибки.
function RootShell({ children }: Readonly<PropsWithChildren>) {
  return (
    <>
      {/* Боковых отступов здесь нет: навигация авторизованной части прижата к краю экрана.
          Отступы задают лейауты и страницы корня (404, ошибка). */}
      <div className="flex min-h-dvh flex-1 flex-col">{children}</div>
      {/* <ReactQueryDevtools /> */}
      {/* <TanStackRouterDevtools /> */}
    </>
  )
}
