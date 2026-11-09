import { createFileRoute, redirect } from '@tanstack/react-router'

import { AuthenticatedLayout } from '~/app/layouts'

import { getStoredRole } from '~/entities/session'

export const Route = createFileRoute('/_authenticated')({
  // Без роли (онбординг не пройден) в приложение не пускаем: навигация и страницы зависят от роли.
  beforeLoad: () => {
    if (!getStoredRole()) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error -- так TanStack Router выполняет редирект
      throw redirect({ to: '/sign-in' })
    }
  },
  component: AuthenticatedLayout,
})
