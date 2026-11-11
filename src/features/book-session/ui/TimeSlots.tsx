import { classNames } from '~/shared/lib'

import { TIME_SLOTS } from '../config/slots'

type TimeSlotsProps = Readonly<{
  /** Раскладка сетки: число колонок и отступы. */
  className?: string
  isTaken: (slotIndex: number) => boolean
  /** Классы слота: высота и размер текста в макете у разных экранов отличаются. */
  itemClassName?: string
  onChange: (slot: string) => void
  value: null | string
}>

/*
 * Слоты времени (по умолчанию сетка 4×2): поиск менторов и карточка ментора.
 * Выбранный — emerald, занятый зачёркнут и недоступен.
 * Hover в макете не нарисован: у свободного слота темнеет рамка.
 */
export function TimeSlots({ className, isTaken, itemClassName, onChange, value }: TimeSlotsProps) {
  return (
    <div aria-label="Время" className={classNames('grid grid-cols-4 gap-1.5', className)} role="group">
      {TIME_SLOTS.map((slot, index) => {
        const taken = isTaken(index)
        const selected = slot === value
        return (
          <button
            aria-label={taken ? `${slot}, занято` : slot}
            aria-pressed={selected}
            className={classNames(
              'min-h-10 cursor-pointer rounded-8 border-[1.5px] text-12 font-bold transition-colors md:min-h-0 md:py-2.5 md:text-13 lg:py-2.25',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald',
              getSlotClassName(selected, taken),
              itemClassName,
            )}
            disabled={taken}
            key={slot}
            onClick={() => {
              onChange(slot)
            }}
            type="button"
          >
            {slot}
          </button>
        )
      })}
    </div>
  )
}

function getSlotClassName(selected: boolean, taken: boolean) {
  if (selected) return 'border-emerald bg-emerald text-white'
  if (taken) return 'cursor-not-allowed border-line bg-transparent text-disabled line-through'
  return 'border-line bg-surface text-body hover:border-line-strong'
}
