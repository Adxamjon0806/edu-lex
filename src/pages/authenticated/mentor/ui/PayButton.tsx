import { classNames } from '~/shared/lib'
import { Button } from '~/shared/ui'

import { BOOKING_TEXTS } from '../config/mentor'

type PayButtonProps = Readonly<{
  booked: boolean
  className?: string
  onPay: () => void
  price: number
  slot: null | string
}>

/*
 * Кнопка оплаты: «Выберите время» (недоступна) → «Оплатить $35» → «Оплачено · сессия в расписании»
 * (тёмный emerald, повторное нажатие ничего не делает).
 */
export function PayButton({ booked, className, onPay, price, slot }: PayButtonProps) {
  return (
    <Button
      className={classNames(booked && 'bg-emerald-700 hover:bg-emerald-700', className)}
      disabled={slot === null}
      onClick={booked ? undefined : onPay}
      size="lg"
    >
      {getLabel(booked, slot, price)}
    </Button>
  )
}

function getLabel(booked: boolean, slot: null | string, price: number) {
  if (booked) return BOOKING_TEXTS.bookedButton
  return slot === null ? BOOKING_TEXTS.pickTime : `${BOOKING_TEXTS.pay} $${String(price)}`
}
