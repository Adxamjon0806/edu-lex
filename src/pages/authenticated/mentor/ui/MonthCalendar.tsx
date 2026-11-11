import { ChevronLeft, ChevronRight } from 'lucide-react'

import { classNames } from '~/shared/lib'
import { IconButton } from '~/shared/ui'

import { CALENDAR } from '../config/mentor'
import { getDayLabel, isDayOff } from '../lib/calendar'

type MonthCalendarProps = Readonly<{
  onChange: (day: number) => void
  value: number
}>

/*
 * Календарь месяца: сетка с понедельника, выбранный день — emerald, недоступные — серые без рамки.
 * Высота дня из макета: 40px до md, 38px на планшете, 44px на десктопе. Стрелки месяца есть только
 * на десктопе и пока ничего не делают: в моках один месяц.
 */
export function MonthCalendar({ onChange, value }: MonthCalendarProps) {
  return (
    <div className="flex flex-col gap-3 lg:gap-4.5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-serif text-18 font-semibold text-heading md:text-20 lg:text-22" id="booking-month">
          {CALENDAR.title}
        </h2>
        <div className="flex gap-1.5 max-lg:hidden">
          <IconButton aria-label="Предыдущий месяц" icon={ChevronLeft} size={36} />
          <IconButton aria-label="Следующий месяц" icon={ChevronRight} size={36} />
        </div>
      </div>
      <div aria-labelledby="booking-month" className="grid grid-cols-7 gap-1 lg:gap-1.5" role="group">
        {CALENDAR.weekdays.map((weekday) => (
          <span aria-hidden className="text-center text-10 font-bold text-muted lg:pb-1 lg:text-11" key={weekday}>
            {weekday}
          </span>
        ))}
        {Array.from({ length: CALENDAR.leadingBlanks }, (_, index) => (
          <span aria-hidden key={`blank-${String(index)}`} />
        ))}
        {Array.from({ length: CALENDAR.days }, (_, index) => {
          const day = index + 1
          const off = isDayOff(day)
          const selected = day === value
          return (
            <button
              aria-label={getDayLabel(day)}
              aria-pressed={selected}
              className={classNames(
                'h-10 cursor-pointer rounded-8 border-[1.5px] text-13 font-bold transition-colors md:h-9.5 lg:h-11 lg:rounded-10 lg:text-14',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald',
                getDayClassName(selected, off),
              )}
              disabled={off}
              key={day}
              onClick={() => {
                onChange(day)
              }}
              type="button"
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function getDayClassName(selected: boolean, off: boolean) {
  if (selected) return 'border-emerald bg-emerald text-white'
  if (off) return 'cursor-not-allowed border-transparent bg-transparent text-disabled'
  return 'border-line bg-surface text-body hover:border-line-strong'
}
