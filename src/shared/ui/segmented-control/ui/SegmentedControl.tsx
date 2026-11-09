import { useId } from 'react'

import type { LucideIcon } from 'lucide-react'

import { classNames } from '~/shared/lib'

export type SegmentedControlOption<T extends string> = Readonly<{
  /** Подпись под значением, как «Intermediate» под «B1». */
  description?: string
  icon?: LucideIcon
  label: string
  value: T
}>

type SegmentedControlProps<T extends string> = Readonly<{
  /** Подпись группы для скринридера (видимый заголовок рядом — через aria-labelledby). */
  'aria-label'?: string
  'aria-labelledby'?: string
  className?: string
  /** Скрыть подписи под значениями (в макете они есть только на широком экране). */
  descriptionClassName?: string
  /** Классы сегмента: размер текста и отступы в макете у разных переключателей отличаются. */
  itemClassName?: string
  name?: string
  onChange: (value: T) => void
  options: readonly SegmentedControlOption<T>[]
  value: T
}>

/*
 * Переключатель из нескольких сегментов: уровень английского, способ входа. Значения из макета:
 * дорожка surface-muted с радиусом 12px и отступом 4px, сегмент — радиус 9px, выбранный — белый с тенью xs.
 * Внутри нативные radio: стрелки, Tab и скринридер работают как у обычной группы переключателей.
 */
export function SegmentedControl<T extends string>({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className,
  descriptionClassName,
  itemClassName,
  name,
  onChange,
  options,
  value,
}: SegmentedControlProps<T>) {
  const generatedName = useId()

  return (
    <div
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={classNames('flex gap-1 rounded-12 bg-surface-muted p-1', className)}
      role="radiogroup"
    >
      {options.map(({ description, icon: Icon, label, value: optionValue }) => (
        <label
          className={classNames(
            'flex min-h-11 flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-9 px-2 py-2.75 text-center text-muted transition-colors select-none',
            'hover:text-heading has-checked:bg-surface has-checked:text-heading has-checked:shadow-xs',
            'has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-emerald',
            itemClassName,
          )}
          key={optionValue}
        >
          <input
            checked={optionValue === value}
            className="sr-only"
            name={name ?? generatedName}
            onChange={() => {
              onChange(optionValue)
            }}
            type="radio"
            value={optionValue}
          />
          <span className="flex items-center gap-2 font-bold">
            {Icon && <Icon aria-hidden className="size-4" />}
            {label}
          </span>
          {description && (
            <span className={classNames('text-11 font-medium opacity-75', descriptionClassName)}>{description}</span>
          )}
        </label>
      ))}
    </div>
  )
}
