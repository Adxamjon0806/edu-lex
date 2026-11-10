import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { classNames } from '~/shared/lib'
import { Card, ProgressBar } from '~/shared/ui'

import { DAILY_GOAL, STATS } from '../config/dashboard'

// Дневная цель по карточкам. В макете есть только на десктопе, поэтому место показа выбирает страница.
export function DailyGoalCard({ className }: Readonly<{ className?: string }>) {
  const { done, total } = DAILY_GOAL
  const left = total - done

  return (
    <Card aria-labelledby="daily-goal-title" as="section" className={classNames('flex flex-col gap-4 p-7', className)}>
      <h2 className="font-serif text-20 font-semibold text-heading" id="daily-goal-title">
        Цель на сегодня
      </h2>
      <p className="flex items-baseline gap-1.5">
        <span className="font-serif text-48 leading-none font-semibold text-heading">{done}</span>
        <span className="text-16 font-semibold text-muted">/ {total} терминов</span>
      </p>
      <ProgressBar
        label="Цель на сегодня"
        size={8}
        track="muted"
        value={Math.round((done / total) * 100)}
        valueText={`${String(done)} из ${String(total)} терминов`}
      />
      <p className="text-13 leading-normal font-medium text-muted">
        Ещё {left} карточек — и серия продлится до {STATS.streakDays + 1} дней.
      </p>
      <Link
        className="mt-auto flex w-fit items-center gap-1.5 text-14 font-bold text-body transition-colors hover:text-success focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald [&_svg]:size-4"
        to="/practice"
      >
        Быстрая практика
        <ArrowRight aria-hidden />
      </Link>
    </Card>
  )
}
