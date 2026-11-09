import type { ComponentProps, ReactNode } from 'react'

import type { LucideIcon } from 'lucide-react'

import { classNames } from '~/shared/lib'

/*
 * Тона из дизайна:
 * - success, danger, premium — статусы (верификация, ошибка, премиум);
 * - neutral — теги (направление, тема);
 * - navy — тёмная метка на светлом фоне;
 * - gold — яркая метка поверх карточки («Рекомендуем»);
 * - gold-soft — золотая метка на тёмно-синем фоне;
 * - gold-outline — золотая рамка без заливки на тёмно-синем фоне («EXPERT» в навигации преподавателя);
 * - outline — белая метка с рамкой.
 */
const toneClasses = {
  danger: 'bg-danger-subtle text-danger',
  gold: 'bg-gold font-extrabold tracking-wide text-navy',
  'gold-outline': 'border-gold tracking-wider text-gold-300',
  'gold-soft': 'border-gold bg-gold/18 text-gold-300',
  navy: 'bg-navy text-white',
  neutral: 'bg-surface-muted text-body-secondary',
  outline: 'border-line bg-surface text-body',
  premium: 'bg-premium-subtle text-premium',
  success: 'bg-success-subtle text-success',
} as const

// Рамка 1px есть у всех тонов (у большинства — прозрачная), чтобы метки одного размера были одной высоты.
const sizeClasses = {
  lg: 'gap-1.5 rounded-8 px-3 py-1.5 text-13 font-semibold [&_svg]:size-4',
  md: 'gap-1 rounded-6 px-2.5 py-1 text-12 font-bold [&_svg]:size-3.5',
  sm: 'gap-1 rounded-6 px-2 py-0.75 text-11 font-bold [&_svg]:size-3',
  // Плашки счётчиков в шапке главной (серия, словарь): на мобильном компактнее, как в макете.
  xl: 'gap-1 rounded-full px-2.5 py-1.75 text-13 font-bold md:gap-2 md:px-3.5 md:py-2.25 md:text-14 lg:px-4 lg:py-2.5 [&_svg]:size-3.5 md:[&_svg]:size-4',
} as const

export type BadgeSize = keyof typeof sizeClasses
export type BadgeTone = keyof typeof toneClasses

type BadgeProps = Omit<ComponentProps<'span'>, 'children'> &
  Readonly<{
    children: ReactNode
    icon?: LucideIcon
    /** Полностью скруглённая метка, как счётчики серий и статусы в шапке. */
    pill?: boolean
    size?: BadgeSize
    tone?: BadgeTone
  }>

// Статичная метка. Для переключаемых меток — Chip.
export function Badge({
  children,
  className,
  icon: Icon,
  pill = false,
  size = 'md',
  tone = 'neutral',
  ...props
}: BadgeProps) {
  return (
    <span
      className={classNames(
        'inline-flex w-fit shrink-0 items-center border border-transparent whitespace-nowrap',
        sizeClasses[size],
        toneClasses[tone],
        pill && 'rounded-full',
        className,
      )}
      {...props}
    >
      {Icon && <Icon aria-hidden />}
      {children}
    </span>
  )
}
