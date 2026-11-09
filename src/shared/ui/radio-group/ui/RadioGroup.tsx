import { useId, type ReactNode } from 'react'

import { RadioGroupContext, type RadioGroupContextValue } from '../model/radioGroupContext'

type MultipleProps = Readonly<{
  multiple: true
  onChange: (values: string[]) => void
  value: readonly string[]
}>

type RadioGroupProps = (MultipleProps | SingleProps) &
  Readonly<{
    children: ReactNode
    /** Классы раскладки вариантов (сетка, список). */
    className?: string
    disabled?: boolean
    /** Заголовок группы. Если он не нужен на экране, скрой его классом sr-only через legendClassName. */
    legend: ReactNode
    legendClassName?: string
    name?: string
  }>

type SingleProps = Readonly<{
  multiple?: false
  onChange: (value: string) => void
  /** Выбранное значение; null — ничего не выбрано. */
  value: null | string
}>

/*
 * Группа вариантов на Radio: одиночный выбор (роль, ответ квиза) или множественный (направления).
 * Одиночный выбор — нативные radio (стрелки переключают вариант), множественный — нативные checkbox
 * (пробел отмечает вариант): так скринридер объявляет правильную семантику без ручных ARIA-ролей.
 */
export function RadioGroup(props: RadioGroupProps) {
  const { children, className, disabled = false, legend, legendClassName, name } = props
  const generatedName = useId()
  const groupName = name ?? generatedName

  const context: RadioGroupContextValue = props.multiple
    ? {
        disabled,
        isChecked: (item) => props.value.includes(item),
        multiple: true,
        name: groupName,
        toggle: (item) => {
          props.onChange(props.value.includes(item) ? props.value.filter((v) => v !== item) : [...props.value, item])
        },
      }
    : {
        disabled,
        isChecked: (item) => props.value === item,
        multiple: false,
        name: groupName,
        toggle: props.onChange,
      }

  return (
    <fieldset className="min-w-0" disabled={disabled}>
      <legend className={legendClassName}>{legend}</legend>
      <RadioGroupContext value={context}>
        <div className={className}>{children}</div>
      </RadioGroupContext>
    </fieldset>
  )
}
