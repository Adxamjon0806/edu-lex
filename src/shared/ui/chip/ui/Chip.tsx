import type { ComponentProps } from 'react'

import type { LucideIcon } from 'lucide-react'

import { classNames } from '~/shared/lib'

/*
 * Тона выбранного состояния из дизайна:
 * - navy — фильтры (предмет, регион): выбранный чип залит navy;
 * - emerald — отметка элемента (документы ментора): мятный фон и рамка emerald.
 * Невыбранный чип у обоих тонов белый с рамкой. Hover в макете не нарисован: приглушённый фон.
 */
const toneClasses = {
  // Иконка у этого тона зелёная в обоих состояниях, как значок документа в макете.
  emerald: {
    off: 'border-line bg-surface text-body hover:bg-surface-muted [&_svg]:text-success',
    on: 'border-emerald bg-success-subtle text-body [&_svg]:text-success',
  },
  navy: {
    off: 'border-line bg-surface text-body hover:bg-surface-muted',
    // В тёмной теме рамка выбранного чипа мятная (line-accent), как в карте замен бандла.
    on: 'border-line-accent bg-navy text-white',
  },
} as const

const sizeClasses = {
  md: 'gap-2 rounded-full px-4.5 py-2.25 text-14 [&_svg]:size-4',
  sm: 'gap-1.5 rounded-8 px-2.5 py-1.75 text-12 [&_svg]:size-3.5',
} as const

export type ChipSize = keyof typeof sizeClasses
export type ChipTone = keyof typeof toneClasses

type ChipProps = Omit<ComponentProps<'button'>, 'aria-pressed'> &
  Readonly<{
    icon?: LucideIcon
    /** Выбран ли чип. Скринридер объявляет это как «нажата» (aria-pressed). */
    selected: boolean
    size?: ChipSize
    tone?: ChipTone
  }>

// Переключаемая метка: фильтр или отметка элемента. Для статичной метки — Badge.
export function Chip({
  children,
  className,
  icon: Icon,
  selected,
  size = 'md',
  tone = 'navy',
  type = 'button',
  ...props
}: ChipProps) {
  return (
    <button
      aria-pressed={selected}
      className={classNames(
        'inline-flex shrink-0 cursor-pointer items-center border-[1.5px] font-semibold whitespace-nowrap transition-colors select-none',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald',
        'active:translate-y-px',
        'disabled:pointer-events-none disabled:opacity-50',
        sizeClasses[size],
        toneClasses[tone][selected ? 'on' : 'off'],
        className,
      )}
      type={type}
      {...props}
    >
      {Icon && <Icon aria-hidden />}
      {children}
    </button>
  )
}
