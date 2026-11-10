import { createFileRoute } from '@tanstack/react-router'

import { LearningPage } from '~/pages/authenticated/learning'

export const Route = createFileRoute('/_authenticated/learning')({
  component: LearningPage,
})
