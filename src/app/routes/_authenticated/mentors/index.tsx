import { createFileRoute } from '@tanstack/react-router'

import { MentorsPage } from '~/pages/authenticated/mentors'

export const Route = createFileRoute('/_authenticated/mentors/')({
  component: MentorsPage,
})
