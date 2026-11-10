import { ProgressRing } from '~/shared/ui'

type ScoreRingProps = Readonly<{
  score: number
  total: number
}>

// Кольцо счёта из макета: 130/104px до md, 150/120px на планшете, 180/146px на десктопе.
export function ScoreRing({ score, total }: ScoreRingProps) {
  return (
    <ProgressRing
      className="size-32.5 md:size-37.5 lg:size-45"
      gradient="score"
      innerClassName="size-26 md:size-30 lg:size-36.5"
      value={(score / total) * 100}
    >
      <span className="font-serif text-36 leading-none font-semibold md:text-42 lg:text-48">{score}</span>
      <span className="text-11 font-semibold text-navy-200 md:text-12 lg:text-13">из {total}</span>
    </ProgressRing>
  )
}
