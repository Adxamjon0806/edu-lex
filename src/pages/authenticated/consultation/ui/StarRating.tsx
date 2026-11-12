import { useId } from 'react'

import { classNames } from '~/shared/lib'

type StarRatingProps = Readonly<{
  onChange: (value: number) => void
  value: number
}>

const STARS = [1, 2, 3, 4, 5] as const

/*
 * Оценка звёздами: нативные radio, стрелки меняют оценку. Горят звёзды до выбранной (gold), остальные
 * тусклые (navy-400). Hover в макете не нарисован: звезда под курсором светлеет.
 */
export function StarRating({ onChange, value }: StarRatingProps) {
  const name = useId()

  return (
    <div aria-label="Оценка консультации" className="flex gap-1.5" role="radiogroup">
      {STARS.map((star) => (
        <label
          className={classNames(
            'cursor-pointer rounded-6 text-28 leading-none transition-colors hover:text-gold-300 lg:text-30',
            'has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-emerald',
            star <= value ? 'text-gold' : 'text-navy-400',
          )}
          key={star}
        >
          <input
            checked={star === value}
            className="sr-only"
            name={name}
            onChange={() => {
              onChange(star)
            }}
            type="radio"
            value={star}
          />
          <span aria-hidden>★</span>
          <span className="sr-only">{star} из 5</span>
        </label>
      ))}
    </div>
  )
}
