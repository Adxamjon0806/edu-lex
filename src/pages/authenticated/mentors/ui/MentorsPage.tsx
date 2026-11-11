import { useState } from 'react'

import { isSlotTaken } from '~/features/book-session'

import { MENTORS, type MentorSubject } from '~/entities/mentor'

import { DEFAULT_DAY, DEFAULT_SUBJECT } from '../config/mentors'
import { filterMentors } from '../lib/mentors'
import { BookingPanel } from './BookingPanel'
import { MentorCard } from './MentorCard'
import { MentorFilters } from './MentorFilters'
import { MentorsHeader } from './MentorsHeader'

/*
 * Поиск консультантов (экран «06 Mentor Marketplace»): поиск, фильтр направления, менторы и запись.
 * Пока это вёрстка на локальном состоянии, как в прототипе: поиск и фильтр отбирают менторов на месте,
 * бронь никуда не отправляется. Выбранный ментор остаётся в записи, даже если фильтр его скрыл.
 * Раскладка: с xl запись — колонка 440px справа от сетки; ниже запись идёт после сетки, а до lg
 * прилипает к низу экрана (до md — шторкой над нижней навигацией во всю ширину).
 */
export function MentorsPage() {
  const [subject, setSubject] = useState<MentorSubject>(DEFAULT_SUBJECT)
  const [query, setQuery] = useState('')
  const [mentorIndex, setMentorIndex] = useState(0)
  const [day, setDay] = useState(DEFAULT_DAY)
  const [slot, setSlot] = useState<null | string>(null)
  const [booked, setBooked] = useState(false)
  const [documentIndex, setDocumentIndex] = useState<null | number>(null)

  const mentors = filterMentors(MENTORS, subject, query)

  function selectMentor(index: number) {
    setMentorIndex(index)
    setSlot(null)
    setBooked(false)
    setDocumentIndex(null)
  }

  return (
    <div className="flex flex-col gap-3.5 md:gap-5 lg:gap-5.5">
      <MentorsHeader onQueryChange={setQuery} query={query} />
      <MentorFilters onSubjectChange={setSubject} subject={subject} />
      <div className="flex flex-col gap-3.5 md:gap-5 lg:gap-6 xl:grid xl:grid-cols-[1fr_--spacing(110)] xl:items-start">
        {mentors.length > 0 ? (
          <ul className="grid gap-3.5 md:grid-cols-2 lg:gap-4">
            {mentors.map((mentor) => {
              const index = MENTORS.indexOf(mentor)
              return (
                <li key={mentor.id}>
                  <MentorCard
                    mentor={mentor}
                    onSelect={() => {
                      selectMentor(index)
                    }}
                    selected={index === mentorIndex}
                  />
                </li>
              )
            })}
          </ul>
        ) : (
          // Пустого списка в макете нет: текст выведен по смыслу.
          <p className="rounded-16 border border-dashed border-line-strong p-6 text-center text-14 font-medium text-muted">
            Никого не нашли. Измените запрос или направление.
          </p>
        )}
        <BookingPanel
          booked={booked}
          className="sticky z-5 max-md:bottom-bottom-nav max-md:-mx-5 max-md:-mb-6 md:bottom-4 lg:static"
          day={day}
          documentIndex={documentIndex}
          isSlotTaken={(slotIndex) => isSlotTaken({ day, every: 3, seed: mentorIndex, slotIndex })}
          mentor={MENTORS[mentorIndex]}
          onBook={() => {
            setBooked(true)
          }}
          onDayChange={(nextDay) => {
            setDay(nextDay)
            setSlot(null)
            setBooked(false)
          }}
          onDocumentToggle={(index) => {
            setDocumentIndex((open) => (open === index ? null : index))
          }}
          onSlotChange={(nextSlot) => {
            setSlot(nextSlot)
            setBooked(false)
          }}
          slot={slot}
        />
      </div>
    </div>
  )
}
