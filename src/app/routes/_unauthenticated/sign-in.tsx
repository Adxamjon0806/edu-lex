import { createFileRoute } from '@tanstack/react-router'

import { SignInPage } from '~/pages/unauthenticated/sign-in'

export const Route = createFileRoute('/_unauthenticated/sign-in')({
  component: SignInPage,
})
