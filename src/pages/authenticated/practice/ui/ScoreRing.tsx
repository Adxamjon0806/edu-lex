import type { CSSProperties } from 'react'

type ScoreRingProps = Readonly<{
  score: number
  total: number
}>

/*
 * Кольцо счёта из макета: дуга от emerald к gold на долю верных ответов, остаток — дорожка navy-600.
 * Доля меняется, поэтому градиент задан в style, цвета — переменными темы.
 * Размеры: 130/104px до md, 150/120px на планшете, 180/146px на десктопе.
 */
export function ScoreRing({ score, total }: ScoreRingProps) {
  const percent = Math.round((score / total) * 100)
  const style: CSSProperties = {
    background: `conic-gradient(from -90deg, var(--color-emerald) 0%, var(--color-gold) ${String(percent)}%, var(--color-navy-600) ${String(percent)}% 100%)`,
  }

  return (
    <div
      className="flex size-32.5 shrink-0 items-center justify-center rounded-full md:size-37.5 lg:size-45"
      style={style}
    >
      <p className="flex size-26 flex-col items-center justify-center rounded-full bg-navy md:size-30 lg:size-36.5">
        <span className="font-serif text-36 leading-none font-semibold md:text-42 lg:text-48">{score}</span>
        <span className="text-11 font-semibold text-navy-200 md:text-12 lg:text-13">из {total}</span>
      </p>
    </div>
  )
}
