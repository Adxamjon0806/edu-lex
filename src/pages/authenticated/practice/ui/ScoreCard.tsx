import type { Ref } from 'react'

import { Badge, Button, buttonVariants, Card } from '~/shared/ui'

import { STREAK } from '../config/quiz'
import { ProfileLink } from './ProfileLink'
import { ScoreRing } from './ScoreRing'

type ScoreCardProps = Readonly<{
  onRestart: () => void
  score: number
  title: string
  /** Заголовок результата: на него переходит фокус после теста. */
  titleRef: Ref<HTMLHeadingElement>
  total: number
  xp: number
}>

/*
 * Итог теста на navy: кольцо счёта, заголовок по счёту и плашка XP.
 * Вид из макета: до md — по центру, без кнопок (они ниже, после разбора ошибок); на планшете — кольцо
 * слева, кнопки под плашкой; на десктопе — колонка по центру. Серия в плашке XP — только на десктопе.
 */
export function ScoreCard({ onRestart, score, title, titleRef, total, xp }: ScoreCardProps) {
  return (
    <Card
      as="section"
      className="flex flex-col items-center gap-3 rounded-22 p-7 text-center md:flex-row md:gap-7 md:p-9 md:text-left lg:flex-col lg:gap-4 lg:p-10 lg:text-center"
      variant="navy"
    >
      <ScoreRing score={score} total={total} />
      <div className="flex flex-col items-center gap-3 md:items-start lg:items-center lg:gap-4">
        <h2 className="font-serif text-23 font-semibold outline-none md:text-28" ref={titleRef} tabIndex={-1}>
          {title}
        </h2>
        <Badge
          className="px-3 py-1.25 text-13 font-bold md:px-3.5 md:py-1.5 md:text-14"
          pill
          size="lg"
          tone="gold-soft"
        >
          +{xp} XP<span className="max-lg:hidden"> · {STREAK}</span>
        </Badge>
        <div className="flex gap-2.5 max-md:hidden lg:mt-2">
          <Button onClick={onRestart} variant="on-navy">
            Пройти снова
          </Button>
          <ProfileLink className={buttonVariants()} />
        </div>
      </div>
    </Card>
  )
}
