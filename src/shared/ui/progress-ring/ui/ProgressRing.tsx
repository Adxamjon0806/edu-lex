import type { CSSProperties, ReactNode } from 'react'

import { classNames } from '~/shared/lib'

/*
 * Дорожка и середина кольца: muted — на белой карточке (середина цвета поверхности),
 * navy — на тёмно-синем фоне (середина navy).
 */
const trackClasses = {
  muted: { inner: 'bg-surface', track: 'var(--color-surface-muted)' },
  navy: { inner: 'bg-navy', track: 'var(--color-navy-600)' },
} as const

type ProgressRingProps = Readonly<{
  children: ReactNode
  /** Размер кольца, например size-45. */
  className?: string
  /**
   * Градиент дуги из макета:
   * - score — от emerald к gold (итог теста);
   * - readiness — от navy через emerald к gold (индекс готовности); на navy-фоне начинается с цвета дорожки.
   */
  gradient: 'readiness' | 'score'
  /** Размер середины, например size-36.5: толщина кольца — разница с размером кольца. */
  innerClassName?: string
  track?: keyof typeof trackClasses
  /** Значение в процентах, 0–100. */
  value: number
}>

/*
 * Кольцо прогресса с содержимым в центре (conic-gradient). Значение меняется, поэтому градиент задан
 * в style, цвета — переменными темы. Подпись значения — в children: её читает скринридер.
 */
export function ProgressRing({
  children,
  className,
  gradient,
  innerClassName,
  track = 'navy',
  value,
}: ProgressRingProps) {
  const percent = Math.min(100, Math.max(0, value))
  const { inner, track: trackColor } = trackClasses[track]
  const start = track === 'navy' ? trackColor : 'var(--color-navy)'
  const style: CSSProperties = {
    background: `conic-gradient(from -90deg, ${getArc(gradient, percent, start)}, ${trackColor} ${String(percent)}% 100%)`,
  }

  return (
    <div className={classNames('flex shrink-0 items-center justify-center rounded-full', className)} style={style}>
      <div className={classNames('flex flex-col items-center justify-center rounded-full', inner, innerClassName)}>
        {children}
      </div>
    </div>
  )
}

function getArc(gradient: ProgressRingProps['gradient'], percent: number, start: string) {
  if (gradient === 'score') return `var(--color-emerald) 0%, var(--color-gold) ${String(percent)}%`
  // В макете emerald стоит на 45% при значении 72%, то есть на 5/8 дуги.
  return `${start} 0%, var(--color-emerald) ${String(percent * 0.625)}%, var(--color-gold) ${String(percent)}%`
}
