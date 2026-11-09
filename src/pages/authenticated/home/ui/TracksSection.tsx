import { useState } from 'react'

import { Link } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { DIRECTIONS, type DirectionKey } from '~/entities/direction'

import { IconButton } from '~/shared/ui'

import { TRACK_META, TRACK_PROGRESS } from '../config/dashboard'
import { TrackCard } from './TrackCard'

/*
 * Профильные треки: по одному на направление. Раскладка из макета:
 * - до md — горизонтальная прокрутка во всю ширину экрана и ссылка «Все»;
 * - md–lg — сетка 2×2;
 * - от lg — четыре в ряд и стрелки прокрутки. Пока треков четыре, они помещаются, и стрелки неактивны.
 */
export function TracksSection() {
  const [selectedTrack, setSelectedTrack] = useState<DirectionKey>('law')

  return (
    <section aria-labelledby="tracks-title" className="flex flex-col gap-3 md:gap-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-serif text-19 font-semibold text-heading md:text-22 lg:text-24" id="tracks-title">
          Профильные треки
        </h2>
        <Link
          className="text-13 font-semibold text-success hover:text-emerald focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald md:hidden"
          to="/"
        >
          Все
        </Link>
        <div className="flex gap-2 max-lg:hidden">
          <IconButton aria-label="Предыдущие треки" disabled icon={ChevronLeft} size={40} />
          <IconButton aria-label="Следующие треки" disabled icon={ChevronRight} size={40} />
        </div>
      </div>
      {/* До md список выходит за отступы страницы (px-5), чтобы карточки прокручивались от края до края. */}
      <ul className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pt-1 pb-1 md:mx-0 md:grid md:grid-cols-2 md:gap-3.5 md:overflow-visible md:p-0 lg:grid-cols-4 lg:gap-4">
        {DIRECTIONS.map(({ en, icon, ru, value }) => (
          <li className="shrink-0" key={value}>
            <TrackCard
              en={en}
              icon={icon}
              meta={TRACK_META}
              onSelect={() => {
                setSelectedTrack(value)
              }}
              progress={TRACK_PROGRESS[value]}
              selected={selectedTrack === value}
              title={ru}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
