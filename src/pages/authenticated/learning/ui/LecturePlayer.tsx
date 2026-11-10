import { Play } from 'lucide-react'

import { classNames } from '~/shared/lib'
import { IconButton, ProgressBar } from '~/shared/ui'

import { LECTURE } from '../config/learning'

/*
 * Мини-лекция на тёмно-синем фоне. Раскладка из макета:
 * - до md — кнопка воспроизведения и «Мини-лекция · 6:24» над полоской;
 * - md–lg — то же с названием лекции и временем «2:11 / 6:24» справа;
 * - от lg — карточка: метка с длительностью, название, под ними кнопка со свечением, полоска и время.
 * Пока это сухая вёрстка: кнопка ничего не воспроизводит.
 */
export function LecturePlayer({ className }: Readonly<{ className?: string }>) {
  const { duration, position, progress, title } = LECTURE

  return (
    <section
      aria-label={`Мини-лекция: ${title}`}
      className={classNames(
        'flex flex-col gap-3.5 rounded-16 bg-navy p-3.5 text-white md:px-5 md:py-4 lg:rounded-18 lg:p-5.5',
        className,
      )}
    >
      <div className="flex flex-col gap-3.5 max-lg:hidden">
        <p className="text-12 font-bold tracking-wider text-emerald-300">МИНИ-ЛЕКЦИЯ · {duration}</p>
        <h2 className="font-serif text-18 font-semibold">{title}</h2>
      </div>
      <div className="flex items-center gap-3 md:gap-3.5 lg:gap-3">
        <IconButton
          aria-label="Воспроизвести мини-лекцию"
          className="lg:size-12 lg:shadow-glow lg:[&_svg]:size-5"
          icon={Play}
          size={44}
          variant="primary"
        />
        <div className="flex flex-1 flex-col gap-1.5">
          <p className="text-13 font-semibold md:text-14 lg:hidden">
            <span className="md:hidden">Мини-лекция · {duration}</span>
            <span className="max-md:hidden">Мини-лекция · {title}</span>
          </p>
          <ProgressBar
            label="Прогресс мини-лекции"
            track="navy"
            value={progress}
            valueText={`${position} из ${duration}`}
          />
        </div>
        <span className="text-12 font-semibold text-navy-200 max-md:hidden">
          {position}
          <span className="lg:hidden"> / {duration}</span>
        </span>
      </div>
    </section>
  )
}
