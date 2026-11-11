import { Star } from 'lucide-react'

import { MENTOR_REVIEWS } from '~/entities/mentor'

import { classNames } from '~/shared/lib'

import { MENTOR_TEXTS } from '../config/mentor'

type MentorReviewsProps = Readonly<{
  className?: string
  rating: string
}>

/*
 * Отзывы. На планшете — заголовок и список белых карточек, на десктопе — карточка с рейтингом
 * и отзывами в две колонки на молочном фоне. На мобильном в макете отзывов нет.
 */
export function MentorReviews({ className, rating }: MentorReviewsProps) {
  return (
    <section
      aria-labelledby="mentor-reviews"
      className={classNames(
        'flex flex-col gap-2.5 lg:gap-3 lg:rounded-18 lg:border lg:border-line lg:bg-surface lg:p-6.5',
        className,
      )}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-serif text-20 font-semibold text-heading lg:text-22" id="mentor-reviews">
          {MENTOR_TEXTS.reviews}
        </h2>
        <span className="flex items-center gap-1.5 text-15 font-bold text-body max-lg:hidden">
          <Star aria-hidden className="size-4 text-gold" />
          {rating}
        </span>
      </div>
      <ul className="grid gap-2.5 lg:grid-cols-2 lg:gap-3">
        {MENTOR_REVIEWS.map(({ author, text }) => (
          <li
            className="flex flex-col gap-1 rounded-12 border border-line bg-surface p-3.5 lg:gap-1.5 lg:border-0 lg:bg-background lg:p-4"
            key={author}
          >
            <p className="flex items-center gap-2 text-13 font-bold text-body">
              {author}
              <span aria-label="5 из 5" className="tracking-widest text-gold" role="img">
                ★★★★★
              </span>
            </p>
            <p className="font-serif text-15 leading-normal font-medium text-body-secondary italic">«{text}»</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
