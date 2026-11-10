import { createFileRoute } from '@tanstack/react-router'

import { SubscriptionPage } from '~/pages/authenticated/subscription'

export const Route = createFileRoute('/_authenticated/profile/subscription')({
  component: SubscriptionPage,
  staticData: { darkPage: true, focusMode: true },
})
