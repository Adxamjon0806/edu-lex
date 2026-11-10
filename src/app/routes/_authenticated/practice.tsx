import { createFileRoute } from '@tanstack/react-router'

import { PracticePage } from '~/pages/authenticated/practice'

export const Route = createFileRoute('/_authenticated/practice')({
  component: PracticePage,
  staticData: { focusMode: true },
})
