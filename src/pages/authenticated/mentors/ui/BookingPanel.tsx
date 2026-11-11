import { Lock, ShieldCheck, Star } from 'lucide-react'

import { TimeSlots } from '~/features/book-session'

import { MentorLink, MentorPrice, type Mentor } from '~/entities/mentor'

import { classNames } from '~/shared/lib'
import { Avatar, Button } from '~/shared/ui'

import { BOOKING_MONTH, BOOKING_TEXTS, BOOKING_TIMEZONE } from '../config/mentors'
import { getSlotLabel } from '../lib/mentors'
import { DayPicker } from './DayPicker'
import { MentorDocuments } from './MentorDocuments'

type BookingPanelProps = Readonly<{
  booked: boolean
  className?: string
  day: number
  documentIndex: null | number
  isSlotTaken: (slotIndex: number) => boolean
  mentor: Mentor
  onBook: () => void
  onDayChange: (day: number) => void
  onDocumentToggle: (index: number) => void
  onSlotChange: (slot: string) => void
  slot: null | string
}>

/*
 * Запись к выбранному ментору. Три вида из макета:
 * - до md — нижняя шторка: ручка, «Запись · имя» с ценой, дни с прокруткой вбок, слоты и кнопка;
 * - md–lg — карточка с рамкой navy: ментор с ценой, о себе, документы, дни, слоты, короткая плашка брони;
 * - от lg — то же с рейтингом, заголовком и превью документов, календарём месяца и подробной плашкой брони.
 * До lg запись прилипает к низу экрана (до md — над нижней навигацией), но стоит в потоке страницы
 * после списка: прокрутив до конца, видно все карточки менторов. Положение задаёт страница (className).
 * Аватар и имя — ссылки на карточку ментора.
 * Кнопка: «Выберите время» (недоступна) → «Оплатить и забронировать · $35» → «Забронировано».
 */
export function BookingPanel({
  booked,
  className,
  day,
  documentIndex,
  isSlotTaken,
  mentor,
  onBook,
  onDayChange,
  onDocumentToggle,
  onSlotChange,
  slot,
}: BookingPanelProps) {
  const { bio, degree, documents, id, initials, name, price, rating, reviews } = mentor
  const slotLabel = slot === null ? '' : getSlotLabel(day, slot)

  return (
    <section
      aria-label={`Запись: ${name}`}
      className={classNames(
        'flex flex-col gap-3 rounded-t-24 bg-surface px-5 pt-3 pb-4.5 shadow-sheet',
        'md:gap-4 md:rounded-20 md:border-[1.5px] md:border-line-accent md:p-6 md:shadow-none lg:gap-4.5 lg:p-6.5',
        className,
      )}
    >
      <span aria-hidden className="mx-auto h-1 w-10 rounded-full bg-line md:hidden" />
      <div className="flex items-center justify-between gap-3 md:hidden">
        <h2 className="font-serif text-18 font-semibold text-heading">
          Запись ·{' '}
          <MentorLink className="hover:underline" mentorId={id}>
            {name}
          </MentorLink>
        </h2>
        <span className="text-14 font-bold text-success">${price}</span>
      </div>

      <div className="flex items-center gap-3.5 max-md:hidden lg:gap-4">
        <MentorLink className="shrink-0 rounded-full" duplicate mentorId={id}>
          <Avatar
            className="size-14 font-serif text-20 font-semibold lg:size-17 lg:text-24 lg:ring-2 lg:ring-emerald lg:ring-offset-3 lg:ring-offset-surface"
            initials={initials}
          />
        </MentorLink>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5 lg:gap-1">
          <h2 className="font-serif text-22 font-semibold text-heading lg:text-24">
            <MentorLink className="hover:underline" mentorId={id}>
              {name}
            </MentorLink>
          </h2>
          <p className="text-13 font-medium text-muted">{degree}</p>
          <p className="flex items-center gap-1.5 text-13 font-semibold text-body max-lg:hidden">
            <Star aria-hidden className="size-3.5 text-gold" />
            {rating} · {reviews} отзывов
          </p>
        </div>
        <MentorPrice className="px-3 py-1.75 text-15 lg:hidden" note={BOOKING_TEXTS.sessionLength} price={price} />
      </div>
      <p className="text-14 leading-relaxed text-body-secondary max-md:hidden">{bio}</p>
      <div className="max-md:hidden">
        <MentorDocuments documents={documents} onToggle={onDocumentToggle} openIndex={documentIndex} />
      </div>

      <div className="flex flex-col gap-2.5 max-md:gap-3 md:max-lg:gap-4">
        <p className="flex justify-between gap-3 text-12 text-muted max-lg:hidden">
          <span className="font-bold tracking-wider">{BOOKING_MONTH}</span>
          <span className="font-semibold">{BOOKING_TIMEZONE}</span>
        </p>
        <DayPicker onChange={onDayChange} value={day} />
        <TimeSlots isTaken={isSlotTaken} onChange={onSlotChange} value={slot} />
      </div>

      {/* Живая область есть всегда, чтобы скринридер объявил бронь. */}
      <div aria-live="polite" className="empty:hidden max-md:hidden">
        {booked && (
          <div className="flex gap-2.5 rounded-12 bg-success-subtle p-3.5 lg:gap-3 lg:px-4">
            <ShieldCheck aria-hidden className="size-5 shrink-0 text-success lg:size-5.5" />
            <p className="text-13 leading-normal font-semibold text-success lg:hidden">
              {BOOKING_TEXTS.booked} · {slotLabel} · {BOOKING_TEXTS.bookedShort}
            </p>
            <div className="flex flex-col gap-0.75 max-lg:hidden">
              <p className="text-14 font-bold text-success">
                {BOOKING_TEXTS.bookedTitle} · {slotLabel}
              </p>
              <p className="text-13 leading-normal font-medium text-body">
                ${price} {BOOKING_TEXTS.bookedEscrow}
              </p>
            </div>
          </div>
        )}
      </div>
      {slot !== null && !booked && (
        <p className="flex items-center gap-2 text-13 font-medium text-body-secondary max-lg:hidden">
          <Lock aria-hidden className="size-3.5 shrink-0 text-success" />
          {BOOKING_TEXTS.secureDeal}
        </p>
      )}

      <Button
        className={classNames(
          'py-3.5 text-15 max-md:rounded-14 md:py-3.75',
          booked && 'bg-emerald-700 hover:bg-emerald-700',
        )}
        disabled={slot === null}
        fullWidth
        onClick={booked ? undefined : onBook}
        size="lg"
      >
        {getActionLabel(booked, slot, price)}
      </Button>
    </section>
  )
}

function getActionLabel(booked: boolean, slot: null | string, price: number) {
  if (booked) return BOOKING_TEXTS.booked
  return slot === null ? BOOKING_TEXTS.pickTime : `${BOOKING_TEXTS.pay} · $${String(price)}`
}
