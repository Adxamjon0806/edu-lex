import { useId } from 'react'

import { classNames } from '~/shared/lib'

import { chipVariants, type ChipSize } from '../lib/chipVariants'

export type ChipGroupOption<T extends string> = Readonly<{
  label: string
  value: T
}>

type ChipGroupProps<T extends string> = Readonly<{
  /** Подпись группы для скринридера (видимый заголовок рядом — через aria-labelledby). */
  'aria-label'?: string
  'aria-labelledby'?: string
  /** Раскладка вариантов: перенос строк, прокрутка вбок и отступы. */
  className?: string
  /** Классы каждого варианта: размер текста и отступы в макете у разных групп отличаются. */
  itemClassName?: string
  name?: string
  onChange: (value: T) => void
  options: readonly ChipGroupOption<T>[]
  size?: ChipSize
  /**
   * Выбранный вариант. Значение по умолчанию задаёт место использования: у фильтра — вариант «Все»,
   * в онбординге — первый из списка.
   */
  value: T
}>

/*
 * Блок выбора одного варианта из чипов: регион в онбординге, направление в поиске менторов.
 * Выбранный чип залит navy. Внутри нативные radio: стрелки переключают вариант, в порядке Tab
 * участвует только выбранный, скринридер объявляет группу переключателей.
 */
export function ChipGroup<T extends string>({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className,
  itemClassName,
  name,
  onChange,
  options,
  size,
  value,
}: ChipGroupProps<T>) {
  const generatedName = useId()

  return (
    <div
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={classNames('flex flex-wrap gap-2', className)}
      role="radiogroup"
    >
      {options.map(({ label, value: optionValue }) => (
        <label
          className={chipVariants({
            className: classNames(
              'has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-emerald',
              itemClassName,
            ),
            selected: optionValue === value,
            size,
          })}
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
          {label}
        </label>
      ))}
    </div>
  )
}
