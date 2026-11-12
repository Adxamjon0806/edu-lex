import { createFileRoute } from '@tanstack/react-router'

import { ConsultationPage } from '~/pages/authenticated/consultation'

export const Route = createFileRoute('/_authenticated/consultation')({
  component: ConsultationPage,
  staticData: { immersive: true },
})
