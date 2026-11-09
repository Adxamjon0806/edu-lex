import { createFileRoute } from '@tanstack/react-router'

import { UnauthenticatedLayout } from '~/app/layouts'

export const Route = createFileRoute('/_unauthenticated')({
  component: UnauthenticatedLayout,
})
