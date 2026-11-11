import { ShieldCheck } from 'lucide-react'

import { BOOKING_TEXTS } from '../config/mentor'

type PaidNoticeProps = Readonly<{
  price: number
  /** Вид из макета: подробный на десктопе, в одну строку на планшете, короткий на мобильном. */
  variant: 'desktop' | 'mobile' | 'tablet'
  when: string
}>

// Плашка после оплаты: сумма заморожена в эскроу до звонка.
export function PaidNotice({ price, variant, when }: PaidNoticeProps) {
  if (variant === 'desktop') {
    return (
      <div className="flex gap-3 rounded-12 bg-success-subtle px-4 py-3.5">
        <ShieldCheck aria-hidden className="size-5.5 shrink-0 text-success" />
        <div className="flex flex-col gap-0.75">
          <p className="text-14 font-bold text-success">
            {BOOKING_TEXTS.booked} · {when}
          </p>
          <p className="text-13 leading-normal font-medium text-body">
            ${price} {BOOKING_TEXTS.bookedEscrow}
          </p>
        </div>
      </div>
    )
  }

  const isTablet = variant === 'tablet'
  return (
    <div className="flex gap-2.5 rounded-12 bg-success-subtle p-3 text-12 leading-normal font-semibold text-success md:p-3.5 md:text-13">
      <ShieldCheck aria-hidden className="size-4.5 shrink-0 md:size-5" />
      <p>
        {BOOKING_TEXTS.booked} · {isTablet && `${when} · `}
        {BOOKING_TEXTS.bookedShort}
      </p>
    </div>
  )
}
