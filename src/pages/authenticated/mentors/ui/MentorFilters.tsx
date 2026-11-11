import { ChevronDown, Star } from 'lucide-react'

import type { MentorSubject } from '~/entities/mentor'

import { ChipGroup } from '~/shared/ui'

import { EXTRA_FILTERS, SUBJECT_OPTIONS } from '../config/mentors'

type MentorFiltersProps = Readonly<{
  onSubjectChange: (subject: MentorSubject) => void
  subject: MentorSubject
}>

/*
 * Фильтры: направление (ChipGroup) и, на десктопе после разделителя, степень, цена и рейтинг.
 * Последние три — будущие выпадающие списки, пока только вид. До md направления прокручиваются вбок
 * от края до края экрана (отменяют отступ лейаута px-5).
 */
export function MentorFilters({ onSubjectChange, subject }: MentorFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <ChipGroup
        aria-label="Направление"
        className="max-md:-mx-5 max-md:flex-nowrap max-md:overflow-x-auto max-md:px-5 max-md:py-0.5 lg:gap-2.5"
        itemClassName="max-md:min-h-11 max-md:px-4 max-md:text-13 md:max-lg:px-4"
        onChange={onSubjectChange}
        options={SUBJECT_OPTIONS}
        value={subject}
      />
      <span aria-hidden className="mx-1.5 h-7 w-px bg-line max-lg:hidden" />
      <FilterButton label={EXTRA_FILTERS.degree} />
      <FilterButton label={EXTRA_FILTERS.price} />
      <FilterButton icon label={EXTRA_FILTERS.rating} />
    </div>
  )
}

// Кнопка будущего выпадающего списка. Hover в макете не нарисован: приглушённый фон, как у чипов.
function FilterButton({ icon = false, label }: Readonly<{ icon?: boolean; label: string }>) {
  return (
    <button
      className="flex cursor-pointer items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2.25 text-14 font-semibold text-body transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald max-lg:hidden"
      type="button"
    >
      {icon && <Star aria-hidden className="size-4 text-gold" />}
      {label}
      <ChevronDown aria-hidden className="size-4" />
    </button>
  )
}
