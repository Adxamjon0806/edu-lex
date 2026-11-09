import type { ReactNode } from 'react'

import { classNames } from '~/shared/lib'

type StepHeadingProps = Readonly<{
  subtitle?: ReactNode
  /** У части шагов подзаголовок в макете есть только на десктопе: max-lg:hidden. */
  subtitleClassName?: string
  title: string
}>

// Заголовок шага онбординга: 28px на мобильном, 34px на планшете, 40px на десктопе (Spectral).
export function StepHeading({ subtitle, subtitleClassName, title }: StepHeadingProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-serif text-28 leading-tight font-semibold text-heading md:text-34 lg:text-40">{title}</h1>
      {subtitle !== undefined && (
        <p className={classNames('text-14 leading-normal text-muted md:text-16', subtitleClassName)}>{subtitle}</p>
      )}
    </div>
  )
}
