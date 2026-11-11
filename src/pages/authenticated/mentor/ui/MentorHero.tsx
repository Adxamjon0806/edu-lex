import { BadgeCheck, Languages, Star, Video } from 'lucide-react'

import { MENTOR_LANGUAGES, MentorPrice, type Mentor } from '~/entities/mentor'

import { Avatar, Badge } from '~/shared/ui'

import { MENTOR_TEXTS } from '../config/mentor'

/*
 * Шапка карточки ментора. Вид из макета:
 * - до md — по центру без рамки: аватар 88px, имя с галочкой, степень, рейтинг; цена — в нижней панели;
 * - md–lg — в рамке navy: аватар 88px, имя, степень, метка Verified с рейтингом, цена справа;
 * - от lg — аватар 112px, метка Verified рядом с именем, рейтинг, число сессий и языки, цена за 50 минут.
 */
export function MentorHero({ mentor }: Readonly<{ mentor: Mentor }>) {
  const { degree, initials, name, price, rating, reviews, sessions } = mentor
  const ratingLabel = `${rating} · ${String(reviews)} отзывов`

  return (
    <section
      aria-labelledby="mentor-name"
      className="flex flex-col items-center gap-2 text-center md:flex-row md:gap-5 md:rounded-20 md:border-[1.5px] md:border-line-accent md:bg-surface md:p-6 md:text-left lg:gap-6 lg:p-7"
    >
      <Avatar
        className="size-22 font-serif text-30 font-semibold ring-2 ring-emerald ring-offset-3 ring-offset-background md:text-32 md:ring-offset-surface lg:size-28 lg:text-40 lg:ring-offset-4"
        initials={initials}
      />
      <div className="flex min-w-0 flex-col items-center gap-2 md:flex-1 md:items-start md:gap-1.5 lg:gap-2">
        <div className="flex flex-wrap items-center justify-center gap-1.5 md:justify-start lg:gap-2.5">
          <h1 className="font-serif text-23 font-semibold text-heading md:text-28 lg:text-34" id="mentor-name">
            {name}
          </h1>
          <BadgeCheck aria-hidden className="size-4.5 text-emerald md:hidden" />
          <span className="sr-only md:hidden">Verified</span>
          <Badge className="px-2.5 max-lg:hidden" icon={BadgeCheck} tone="success">
            Verified
          </Badge>
        </div>
        <p className="text-13 font-medium text-body-secondary md:text-14 lg:text-15">{degree}</p>
        <div className="flex flex-wrap items-center gap-2.5 text-13 font-semibold text-body lg:gap-4.5 lg:text-14">
          <Badge className="px-2 text-11 max-md:hidden lg:hidden" icon={BadgeCheck} tone="success">
            Verified
          </Badge>
          <span className="flex items-center gap-1.25 lg:gap-1.5">
            <Star aria-hidden className="size-3.5 text-gold lg:size-4" />
            {ratingLabel}
          </span>
          <span className="flex items-center gap-1.5 max-lg:hidden">
            <Video aria-hidden className="size-4 text-success" />
            {sessions} сессий
          </span>
          <span className="flex items-center gap-1.5 max-lg:hidden">
            <Languages aria-hidden className="size-4 text-success" />
            {MENTOR_LANGUAGES}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 max-md:hidden">
        <MentorPrice className="rounded-10 px-3.5 py-2 text-18 lg:px-4 lg:text-22" price={price} />
        <span className="text-12 font-semibold text-muted max-lg:hidden">{MENTOR_TEXTS.perSession}</span>
      </div>
    </section>
  )
}
