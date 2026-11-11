import type { ComponentProps } from 'react'

import type { LucideIcon } from 'lucide-react'

import { classNames } from '~/shared/lib'

import { chipVariants, type ChipSize, type ChipTone } from '../lib/chipVariants'

type ChipProps = Omit<ComponentProps<'button'>, 'aria-pressed'> &
  Readonly<{
    icon?: LucideIcon
    /** Выбран ли чип. Скринридер объявляет это как «нажата» (aria-pressed). */
    selected: boolean
    size?: ChipSize
    tone?: ChipTone
  }>

/*
 * Переключаемая метка: включает и выключает один элемент (например, документ ментора).
 * Для выбора одного варианта из нескольких — ChipGroup, для статичной метки — Badge.
 */
export function Chip({ children, className, icon: Icon, selected, size, tone, type = 'button', ...props }: ChipProps) {
  return (
    <button
      aria-pressed={selected}
      className={chipVariants({
        className: classNames(
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald',
          'disabled:pointer-events-none disabled:opacity-50',
          className,
        ),
        selected,
        size,
        tone,
      })}
      type={type}
      {...props}
    >
      {Icon && <Icon aria-hidden />}
      {children}
    </button>
  )
}
