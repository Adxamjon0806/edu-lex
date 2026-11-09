import { Link } from '@tanstack/react-router'
import { Play } from 'lucide-react'

import { classNames } from '~/shared/lib'
import { buttonVariants, ProgressBar } from '~/shared/ui'

import type { ActiveCourse } from '../model/types'

type ActiveCourseCardProps = Readonly<{
  className?: string
  course: ActiveCourse
}>

/*
 * Тёмная карточка активного курса с главной. Раскладка из макета:
 * - до md — карточка целиком ведёт к курсу: процент рядом с меткой, без кнопки;
 * - md–lg — одна колонка: процент рядом с названием, кнопка «Продолжить» внизу;
 * - от lg — две колонки: справа крупный процент и кнопка с иконкой, в строке модуля ещё остаток терминов.
 * Процент в разных местах — это отдельные элементы, видимый всегда один (остальные display: none).
 */
export function ActiveCourseCard({
  className,
  course: { modulesDone, modulesTotal, moduleTitle, progress, termsLeft, title },
}: ActiveCourseCardProps) {
  const percent = `${String(progress)}%`

  return (
    <section
      aria-labelledby="active-course-title"
      className={classNames(
        'relative flex flex-col gap-2.5 rounded-18 bg-navy p-5 text-white',
        'md:gap-3 md:rounded-20 md:p-7',
        'lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8 lg:px-9 lg:py-8',
        className,
      )}
    >
      <div className="flex flex-col gap-2.5 md:gap-3 lg:gap-3.5">
        <div className="flex items-center justify-between gap-4">
          <span className="text-11 font-bold tracking-widest text-emerald-300 uppercase md:text-12">Активный курс</span>
          <span className="font-serif text-22 leading-none font-semibold text-gold-400 md:hidden">{percent}</span>
        </div>
        <div className="flex items-end justify-between gap-4">
          <h2 className="lg:text-36 font-serif text-23 leading-tight font-semibold md:text-30" id="active-course-title">
            {title}
          </h2>
          <span className="hidden font-serif text-40 leading-none font-semibold text-gold-400 md:inline lg:hidden">
            {percent}
          </span>
        </div>
        <p className="text-13 font-medium text-navy-100 md:text-14 lg:text-15">
          Модуль {modulesDone} из {modulesTotal} · {moduleTitle}
          <span className="max-lg:hidden"> · {termsLeft} терминов осталось</span>
        </p>
        {/* Полоска 6px, с md — 8px; на десктопе заливка градиентом, как в макете. */}
        <ProgressBar
          className="md:h-2 lg:mt-1.5 lg:max-w-140 lg:[&>div]:bg-linear-to-r lg:[&>div]:from-emerald lg:[&>div]:to-emerald-500"
          glow
          label={`Прогресс курса «${title}»`}
          size={6}
          track="navy"
          value={progress}
        />
      </div>
      <div className="flex flex-col items-start gap-4 lg:items-end">
        <span aria-hidden className="hidden font-serif text-56 leading-none font-semibold text-gold-400 lg:inline">
          {percent}
        </span>
        <Link
          className={buttonVariants({
            className: classNames(
              'md:mt-1.5 md:px-6 md:py-3.25 md:text-15 lg:mt-0 lg:px-6.5 lg:py-3.5',
              // До md кнопки не видно: ссылка растянута на всю карточку, и карточка целиком ведёт к курсу.
              'max-md:absolute max-md:inset-0 max-md:rounded-18 max-md:bg-transparent max-md:text-transparent max-md:hover:bg-white/5',
            ),
          })}
          to="/"
        >
          <Play aria-hidden className="max-lg:hidden" />
          Продолжить
        </Link>
      </div>
    </section>
  )
}
