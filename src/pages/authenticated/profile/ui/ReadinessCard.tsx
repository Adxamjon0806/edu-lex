import { classNames } from '~/shared/lib'
import { Card, ProgressBar, ProgressRing } from '~/shared/ui'

import { READINESS, READINESS_PARTS } from '../config/profile'

// Индекс готовности на десктопе: кольцо 200px, полосы по составляющим и подсказка до порога.
export function ReadinessCard({ className }: Readonly<{ className?: string }>) {
  return (
    <Card
      aria-labelledby="readiness-title"
      as="section"
      className={classNames('flex flex-col gap-5 rounded-20 p-7', className)}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-serif text-22 font-semibold text-heading" id="readiness-title">
          Индекс готовности
        </h2>
        <span className="text-12 font-semibold text-muted" lang="en">
          Readiness Index
        </span>
      </div>
      <div className="flex items-center gap-7">
        <ProgressRing
          className="size-50"
          gradient="readiness"
          innerClassName="size-40"
          track="muted"
          value={READINESS.value}
        >
          <span className="font-serif text-56 leading-none font-semibold text-heading">{READINESS.value}%</span>
          <span className="text-12 font-semibold text-success">{READINESS.delta}</span>
        </ProgressRing>
        <ul className="flex flex-1 flex-col gap-3.5">
          {READINESS_PARTS.map(({ label, value }) => (
            <li className="flex flex-col gap-1.5" key={label}>
              <p className="flex justify-between gap-2 text-13 font-semibold text-body">
                <span>{label}</span>
                <span className="text-success">{value}%</span>
              </p>
              <ProgressBar fill="navy-gradient" label={label} size={6} track="muted" value={value} />
            </li>
          ))}
        </ul>
      </div>
      <p className="rounded-12 bg-background px-4 py-3.5 text-14 leading-normal font-medium text-body-secondary">
        {READINESS.hint}
      </p>
    </Card>
  )
}
