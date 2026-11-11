import { BadgeCheck, Star } from 'lucide-react'

import { MentorLink, MentorPrice, type Mentor } from '~/entities/mentor'

import { classNames } from '~/shared/lib'
import { Avatar, Badge } from '~/shared/ui'

import { BOOKING_TEXTS } from '../config/mentors'

type MentorCardProps = Readonly<{
  mentor: Mentor
  onSelect: () => void
  selected: boolean
}>

/*
 * Карточка ментора в списке. Три вида из макета:
 * - до md — строка: аватар, имя с галочкой, «направление · ★ рейтинг», цена справа;
 * - md–lg — плитка: аватар, имя и направление, метка Verified, рейтинг и цена;
 * - от lg — плитка: степень вместо направления, теги, рейтинг с отзывами, цена за 50 минут.
 * Нажатие на карточку выбирает ментора для записи: под всей карточкой лежит кнопка выбора, остальное
 * содержимое пропускает нажатия к ней. Аватар и имя — ссылки на карточку ментора поверх кнопки
 * (ссылку нельзя вложить в кнопку).
 * Выбранная — рамка navy в 2px (вторая линия — кольцом, чтобы карточка не сдвигалась) и тень.
 */
export function MentorCard({ mentor, onSelect, selected }: MentorCardProps) {
  const { degree, id, initials, name, price, rating, reviews, subjectLabel, tags } = mentor

  return (
    <article
      className={classNames(
        'relative flex items-center gap-3 rounded-14 border bg-surface p-3.5 transition-shadow',
        'md:h-full md:flex-col md:items-stretch md:rounded-16 md:p-4.5 lg:gap-3.5 lg:p-5',
        selected
          ? 'border-line-accent ring-1 ring-line-accent md:shadow-raised'
          : 'border-line hover:border-line-strong',
      )}
    >
      <button
        aria-label={`Выбрать для записи: ${name}`}
        aria-pressed={selected}
        className="absolute inset-0 cursor-pointer rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
        onClick={onSelect}
        type="button"
      />
      <div className="pointer-events-none relative flex min-w-0 flex-1 items-center gap-3 md:flex-none lg:gap-3.5">
        <MentorLink className="pointer-events-auto shrink-0 rounded-full" duplicate mentorId={id}>
          <Avatar className="size-11.5 font-serif text-16 font-semibold lg:size-13 lg:text-18" initials={initials} />
        </MentorLink>
        <div className="flex min-w-0 flex-1 flex-col gap-0.75 md:gap-0.5 lg:gap-0.75">
          <p className="flex items-center gap-1.25 text-14 font-bold text-heading md:text-15 lg:text-16">
            <MentorLink className="pointer-events-auto hover:underline" mentorId={id}>
              {name}
            </MentorLink>
            <BadgeCheck aria-hidden className="size-4 shrink-0 text-emerald md:hidden" />
            <span className="sr-only md:hidden">Verified</span>
          </p>
          <p className="text-12 font-medium text-muted lg:text-13">
            <span className="md:hidden">
              {subjectLabel} · ★ {rating}
            </span>
            <span className="max-md:hidden lg:hidden">{subjectLabel}</span>
            <span className="max-lg:hidden">{degree}</span>
          </p>
        </div>
      </div>
      <div className="pointer-events-none relative flex flex-wrap gap-1.5 max-md:hidden">
        <Badge className="max-lg:px-2 max-lg:text-11" icon={BadgeCheck} tone="success">
          Verified
        </Badge>
        {tags.map((tag) => (
          <Badge className="px-2 font-semibold max-lg:hidden" key={tag}>
            {tag}
          </Badge>
        ))}
      </div>
      {/* С md нижняя строка прижата к низу: карточки одного ряда сетки одной высоты. */}
      <div className="pointer-events-none relative flex items-center justify-between gap-2 md:mt-auto">
        <p className="flex items-center gap-1 text-13 font-semibold text-body max-md:hidden lg:gap-1.5">
          <Star aria-hidden className="size-3.5 text-gold" />
          <span>
            {rating}
            <span className="max-lg:hidden"> · {reviews} отзывов</span>
          </span>
        </p>
        <MentorPrice className="px-2.5 py-1.5 text-13 md:py-1.25 lg:hidden" price={price} />
        <MentorPrice className="px-3 py-1.5 text-14 max-lg:hidden" note={BOOKING_TEXTS.sessionLength} price={price} />
      </div>
    </article>
  )
}
