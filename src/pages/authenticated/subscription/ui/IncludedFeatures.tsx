import { CircleCheck } from 'lucide-react'

import { classNames } from '~/shared/lib'

import { FEATURES } from '../config/subscription'

/*
 * Что входит в Premium. На десктопе — в рамке с заголовком «ВКЛЮЧЕНО», на планшете — просто список,
 * на мобильном в макете его нет.
 */
export function IncludedFeatures({ className }: Readonly<{ className?: string }>) {
  return (
    <section
      aria-labelledby="features-title"
      className={classNames(
        'flex w-full flex-col gap-3 max-md:hidden lg:rounded-18 lg:border lg:border-navy-600 lg:p-6',
        className,
      )}
    >
      <h2 className="text-12 font-bold tracking-widest text-navy-200 max-lg:sr-only" id="features-title">
        ВКЛЮЧЕНО
      </h2>
      <ul className="flex flex-col gap-2.5 lg:gap-3">
        {FEATURES.map((feature) => (
          <li className="flex items-center gap-2.5 text-15 font-semibold" key={feature}>
            <CircleCheck aria-hidden className="size-4.5 shrink-0 text-emerald-500" />
            {feature}
          </li>
        ))}
      </ul>
    </section>
  )
}
