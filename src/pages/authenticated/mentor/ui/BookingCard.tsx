import { Lock, RotateCcw } from 'lucide-react'

import { TimeSlots } from '~/features/book-session'

import { BOOKING_TEXTS } from '../config/mentor'
import { MonthCalendar } from './MonthCalendar'
import { PaidNotice } from './PaidNotice'
import { PayButton } from './PayButton'
import { PaymentOptions } from './PaymentOptions'

type BookingCardProps = Readonly<{
  booked: boolean
  day: number
  isSlotTaken: (slotIndex: number) => boolean
  onDayChange: (day: number) => void
  onPay: () => void
  onPaymentChange: (payment: string) => void
  onSlotChange: (slot: string) => void
  payment: string
  price: number
  slot: null | string
  /** Выбранные дата и время, например «Чт, 5 ноября · 10:30». */
  when: string
}>

/*
 * Запись к ментору в рамке navy. Вид из макета:
 * - до md — календарь и слоты в 4 колонки (оплата — в нижней панели страницы);
 * - md–lg — календарь и слоты в 2 колонки рядом, под слотами выбранное время (оплата — ниже карточки);
 * - от lg — колонка: календарь, слоты, сводка, способ оплаты, плашка, кнопка и условия сделки.
 */
export function BookingCard({
  booked,
  day,
  isSlotTaken,
  onDayChange,
  onPay,
  onPaymentChange,
  onSlotChange,
  payment,
  price,
  slot,
  when,
}: BookingCardProps) {
  return (
    <section
      aria-labelledby="booking-month"
      className="flex flex-col gap-3 rounded-18 border-[1.5px] border-line-accent bg-surface p-4 md:grid md:grid-cols-2 md:gap-6 md:rounded-20 md:p-6 lg:flex lg:gap-4.5 lg:p-6.5"
    >
      <MonthCalendar onChange={onDayChange} value={day} />
      <div className="flex flex-col gap-3 lg:gap-2">
        <p className="text-12 font-bold tracking-wider text-muted max-md:hidden md:pt-1.5 lg:pt-0">
          {BOOKING_TEXTS.slots}
          <span className="max-lg:hidden"> · {BOOKING_TEXTS.slotsZone}</span>
        </p>
        <TimeSlots
          className="md:grid-cols-2 lg:grid-cols-4"
          isTaken={isSlotTaken}
          itemClassName="min-h-11 md:min-h-0 md:py-2.75 lg:py-2.5"
          onChange={onSlotChange}
          value={slot}
        />
        <p className="text-13 font-semibold text-body max-md:hidden lg:hidden">{when}</p>
      </div>

      <dl className="flex flex-col gap-2.5 rounded-14 bg-background p-4 text-14 font-semibold text-body-secondary max-lg:hidden">
        <div className="flex justify-between gap-3">
          <dt>{BOOKING_TEXTS.summaryWhen}</dt>
          <dd className="font-bold text-body">{when}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt>{BOOKING_TEXTS.summaryDuration}</dt>
          <dd className="font-bold text-body">{BOOKING_TEXTS.duration}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt>{BOOKING_TEXTS.summaryTotal}</dt>
          <dd className="font-serif text-22 font-semibold text-heading">${price}</dd>
        </div>
      </dl>
      <div className="max-lg:hidden">
        <PaymentOptions layout="desktop" onChange={onPaymentChange} value={payment} />
      </div>
      {/* Живая область есть всегда, чтобы скринридер объявил оплату. */}
      <div aria-live="polite" className="empty:hidden max-lg:hidden">
        {booked && <PaidNotice price={price} variant="desktop" when={when} />}
      </div>
      <PayButton booked={booked} className="w-full py-4 max-lg:hidden" onPay={onPay} price={price} slot={slot} />
      <div className="flex flex-col gap-1.5 text-12 leading-normal font-medium text-muted max-lg:hidden">
        <p className="flex items-center gap-1.5">
          <Lock aria-hidden className="size-3.5 shrink-0 text-success" />
          {BOOKING_TEXTS.secureDeal}
        </p>
        <p className="flex items-center gap-1.5">
          <RotateCcw aria-hidden className="size-3.5 shrink-0 text-success" />
          {BOOKING_TEXTS.cancelPolicy}
        </p>
      </div>
    </section>
  )
}
