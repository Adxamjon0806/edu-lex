import { Link } from '@tanstack/react-router'

import { buttonVariants } from '~/shared/ui'

import { MENTOR_TEXTS, NOT_FOUND_TEXTS } from '../config/mentor'

// Ментора с таким id нет: короткое объяснение и путь обратно к списку. В макете экрана нет.
export function MentorNotFound() {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center md:py-24">
      <h1 className="font-serif text-26 font-semibold text-heading md:text-30">{NOT_FOUND_TEXTS.title}</h1>
      <p className="text-15 font-medium text-muted">{NOT_FOUND_TEXTS.description}</p>
      <Link className={buttonVariants({ className: 'mt-2' })} to="/mentors">
        {MENTOR_TEXTS.back}
      </Link>
    </div>
  )
}
