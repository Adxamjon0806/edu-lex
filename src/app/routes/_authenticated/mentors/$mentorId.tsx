import { createFileRoute } from '@tanstack/react-router'

import { MentorPage } from '~/pages/authenticated/mentor'

export const Route = createFileRoute('/_authenticated/mentors/$mentorId')({
  component: MentorPage,
})
