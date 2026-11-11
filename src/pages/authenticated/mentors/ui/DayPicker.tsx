import { classNames } from '~/shared/lib'

import { BOOKING_DAYS } from '../config/mentors'

type DayPickerProps = Readonly<{
  onChange: (dayIndex: number) => void
  value: number
}>

/*
 * Дни недели для записи. С md — сетка из 7 колонок, до md — ряд кнопок по 44px с прокруткой вбок.
 * Выбранный день залит navy, как выбранный чип. Hover в макете не нарисован: приглушённый фон.
 */
export function DayPicker({ onChange, value }: DayPickerProps) {
  return (
    <div aria-label="День" className="flex gap-1.5 overflow-x-auto md:grid md:grid-cols-7" role="group">
      {BOOKING_DAYS.map(({ date, weekday }, index) => {
        const selected = index === value
        return (
          <button
            aria-label={`${weekday}, ${date} ноября`}
            aria-pressed={selected}
            className={classNames(
              'flex w-11 shrink-0 cursor-pointer flex-col items-center rounded-10 border-[1.5px] py-1.5 transition-colors',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald',
              'md:w-auto md:gap-0.5 md:py-2',
              selected
                ? 'border-line-accent bg-navy text-white'
                : 'border-line bg-surface text-body hover:bg-surface-muted',
            )}
            key={date}
            onClick={() => {
              onChange(index)
            }}
            type="button"
          >
            <span className="text-10 font-semibold opacity-75 md:text-11">{weekday}</span>
            <span className="text-15 font-bold md:text-16">{date}</span>
          </button>
        )
      })}
    </div>
  )
}
