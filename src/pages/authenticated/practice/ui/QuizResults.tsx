import type { Ref } from 'react'

import { Button, buttonVariants } from '~/shared/ui'

import type { Mistake } from '../model/types'
import { MistakesList } from './MistakesList'
import { ProfileLink } from './ProfileLink'
import { ScoreCard } from './ScoreCard'

type QuizResultsProps = Readonly<{
  mistakes: readonly Mistake[]
  onRestart: () => void
  score: number
  title: string
  titleRef: Ref<HTMLHeadingElement>
  total: number
  xp: number
}>

/*
 * Результаты теста. На десктопе итог (380px) и разбор ошибок рядом, ниже lg — друг под другом.
 * На мобильном кнопки «Пройти снова» и «В профиль» — в конце, на всю ширину (как в макете).
 */
export function QuizResults({ mistakes, onRestart, ...scoreProps }: QuizResultsProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-5.5 lg:grid lg:grid-cols-[--spacing(95)_1fr] lg:items-start lg:gap-6">
      <ScoreCard onRestart={onRestart} {...scoreProps} />
      <MistakesList mistakes={mistakes} />
      <div className="flex flex-col gap-4 md:hidden">
        <Button className="rounded-14 text-15" fullWidth onClick={onRestart} size="lg" variant="secondary">
          Пройти снова
        </Button>
        <ProfileLink
          className={buttonVariants({ className: 'rounded-14 py-4 text-15', fullWidth: true, size: 'lg' })}
        />
      </div>
    </div>
  )
}
