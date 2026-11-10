import { classNames } from '~/shared/lib'
import { ProgressRing } from '~/shared/ui'

import { READINESS } from '../config/profile'

/*
 * Индекс готовности на navy для планшета и мобильного (на десктопе — ReadinessCard).
 * Планшет: отдельная navy-карточка, кольцо 170px с приростом внутри и пояснение порога.
 * Мобильный: часть navy-шапки, кольцо 116px, прирост под заголовком.
 */
export function ReadinessHero({ className }: Readonly<{ className?: string }>) {
  return (
    <section
      aria-labelledby="readiness-hero-title"
      className={classNames('flex items-center gap-4.5 text-white md:gap-7 md:rounded-20 md:bg-navy md:p-7', className)}
    >
      <ProgressRing
        className="size-29 md:size-42.5"
        gradient="readiness"
        innerClassName="size-23 md:size-34"
        value={READINESS.value}
      >
        <span className="font-serif text-32 leading-none font-semibold md:text-48">{READINESS.value}%</span>
        <span className="text-12 font-semibold text-emerald-300 max-md:hidden">{READINESS.delta}</span>
      </ProgressRing>
      <div className="flex flex-col gap-1.5 md:gap-2.5">
        <p className="text-11 font-bold tracking-widest text-gold-300 md:text-12" lang="en">
          READINESS INDEX
        </p>
        <h2 className="font-serif text-17 leading-tight font-semibold md:text-24" id="readiness-hero-title">
          <span className="md:hidden">{READINESS.title.mobile}</span>
          <span className="max-md:hidden">{READINESS.title.tablet}</span>
        </h2>
        <p className="text-14 leading-normal font-medium text-navy-100 max-md:hidden">{READINESS.summary}</p>
        <p className="text-12 font-semibold text-emerald-300 md:hidden">{READINESS.delta}</p>
      </div>
    </section>
  )
}
