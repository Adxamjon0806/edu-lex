import { useState } from 'react'

import { Link, useParams } from '@tanstack/react-router'
import { ArrowLeft, ChevronLeft, Heart, RotateCcw } from 'lucide-react'

import { isSlotTaken } from '~/features/book-session'

import { getMentor, getMentorSeed } from '~/entities/mentor'

import { IconButton, iconButtonVariants } from '~/shared/ui'

import { BOOKING_TEXTS, DEFAULT_DAY, DEFAULT_PAYMENT, MENTOR_TEXTS } from '../config/mentor'
import { getWhenLabel } from '../lib/calendar'
import { BookingCard } from './BookingCard'
import { MentorAbout } from './MentorAbout'
import { MentorCredentials } from './MentorCredentials'
import { MentorHero } from './MentorHero'
import { MentorNotFound } from './MentorNotFound'
import { MentorReviews } from './MentorReviews'
import { PaidNotice } from './PaidNotice'
import { PayButton } from './PayButton'
import { PaymentOptions } from './PaymentOptions'

/*
 * Карточка ментора (экран «10 Карточка ментора»): о менторе, документы, отзывы и запись с оплатой.
 * Пока это вёрстка на локальном состоянии, как в прототипе: оплата никуда не отправляется.
 * Раскладка: с xl запись — колонка 470px справа; ниже всё друг под другом, отзывы в конце.
 * До md цена и кнопка оплаты — в панели, прилипающей к низу над навигацией (как запись в поиске менторов).
 * Состояние сбрасывается при смене ментора: профиль получает key по id.
 */
export function MentorPage() {
  const { mentorId } = useParams({ from: '/_authenticated/mentors/$mentorId' })
  return <MentorProfile key={mentorId} mentorId={mentorId} />
}

function MentorProfile({ mentorId }: Readonly<{ mentorId: string }>) {
  const mentor = getMentor(mentorId)
  const [day, setDay] = useState(DEFAULT_DAY)
  const [slot, setSlot] = useState<null | string>(null)
  const [booked, setBooked] = useState(false)
  const [payment, setPayment] = useState(DEFAULT_PAYMENT)
  const [documentIndex, setDocumentIndex] = useState<null | number>(null)

  if (mentor === undefined) return <MentorNotFound />

  const seed = getMentorSeed(mentorId)
  const when = getWhenLabel(day, slot)
  const { documents, price, rating } = mentor

  function toggleDocument(index: number) {
    setDocumentIndex((open) => (open === index ? null : index))
  }

  function pay() {
    setBooked(true)
  }

  return (
    <div className="flex flex-col gap-3.5 md:gap-4.5 lg:gap-5">
      <div className="flex items-center justify-between">
        <Link
          className="flex w-fit items-center gap-1.5 rounded-6 text-14 font-bold text-body transition-colors hover:text-success focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald max-md:hidden"
          to="/mentors"
        >
          <ArrowLeft aria-hidden className="size-4" />
          {MENTOR_TEXTS.back}
        </Link>
        <Link aria-label={MENTOR_TEXTS.back} className={iconButtonVariants({ className: 'md:hidden' })} to="/mentors">
          <ChevronLeft aria-hidden />
        </Link>
        {/* Избранное пока ничего не делает. */}
        <IconButton aria-label="В избранное" className="md:hidden" icon={Heart} />
      </div>

      <div className="flex flex-col gap-3.5 md:gap-4.5 lg:gap-5 xl:grid xl:grid-cols-[1fr_--spacing(117.5)] xl:items-start xl:gap-6">
        {/* До xl колонка «растворяется»: её блоки и запись идут одним столбцом, отзывы — в конце. */}
        <div className="contents xl:flex xl:flex-col xl:gap-5">
          <MentorHero mentor={mentor} />
          <MentorAbout mentor={mentor} onDocumentToggle={toggleDocument} openDocument={documentIndex} />
          <MentorCredentials
            className="max-lg:hidden"
            documents={documents}
            onToggle={toggleDocument}
            openIndex={documentIndex}
          />
          <MentorReviews
            className="max-xl:order-last max-md:hidden"
            rating={`${rating} · ${String(mentor.reviews)} отзывов`}
          />
        </div>
        <BookingCard
          booked={booked}
          day={day}
          isSlotTaken={(slotIndex) => isSlotTaken({ day, every: 4, seed, slotIndex })}
          onDayChange={(nextDay) => {
            setDay(nextDay)
            setSlot(null)
            setBooked(false)
          }}
          onPay={pay}
          onPaymentChange={setPayment}
          onSlotChange={(nextSlot) => {
            setSlot(nextSlot)
            setBooked(false)
          }}
          payment={payment}
          price={price}
          slot={slot}
          when={when}
        />

        {/* Планшет: оплата под карточкой записи. */}
        <div className="flex flex-col gap-4.5 max-md:hidden lg:hidden">
          <PaymentOptions layout="tablet" onChange={setPayment} value={payment} />
          <div aria-live="polite" className="empty:hidden">
            {booked && <PaidNotice price={price} variant="tablet" when={when} />}
          </div>
          <PayButton booked={booked} className="w-full py-4" onPay={pay} price={price} slot={slot} />
          <p className="flex items-center gap-1.5 text-12 font-medium text-muted">
            <RotateCcw aria-hidden className="size-3.5 shrink-0 text-success" />
            {BOOKING_TEXTS.cancelPolicy}
          </p>
        </div>

        {/* Мобильный: короткая плашка после оплаты. */}
        <div aria-live="polite" className="empty:hidden md:hidden">
          {booked && <PaidNotice price={price} variant="mobile" when={when} />}
        </div>
      </div>

      <div className="sticky bottom-bottom-nav z-5 -mx-5 -mb-6 flex items-center gap-3.5 border-t border-line bg-surface px-5 pt-3.5 pb-4 md:hidden">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="font-serif text-22 font-semibold text-heading">${price}</p>
          <p className="truncate text-11 font-semibold text-muted">{when}</p>
        </div>
        <PayButton booked={booked} className="rounded-14 px-5 py-3.75 text-15" onPay={pay} price={price} slot={slot} />
      </div>
    </div>
  )
}
