import type { ReactNode } from 'react'

import { classNames } from '~/shared/lib'

import {
  selectableCardVariants,
  type SelectableCardSelectedTone,
  type SelectableCardState,
} from '../../selectable-card'
import { useRadioGroupContext } from '../model/radioGroupContext'

type RadioProps = Readonly<{
  children: ReactNode
  /** Раскладка, радиус и отступы карточки. */
  className?: string
  disabled?: boolean
  ring?: boolean
  selectedTone?: SelectableCardSelectedTone
  /**
   * Состояние сверх выбора: success, danger или muted после проверки ответа квиза.
   * Без него карточка показывает default или selected по выбору в группе.
   */
  state?: Exclude<SelectableCardState, 'selected'>
  value: string
}>

/*
 * Вариант внутри RadioGroup: label с нативным radio или checkbox (визуально скрыт) и карточкой SelectableCard.
 * Состояние выставлено в data-state ("default", "selected", "success", "danger", "muted"): содержимое
 * перекрашивается через group-data-[state=…]/radio, а индикатор — через RadioIndicator.
 */
export function Radio({ children, className, disabled = false, ring, selectedTone, state, value }: RadioProps) {
  const group = useRadioGroupContext()
  const checked = group.isChecked(value)
  const visualState: SelectableCardState = state ?? (checked ? 'selected' : 'default')
  const isDisabled = group.disabled || disabled

  return (
    <label
      className={classNames(
        'group/radio relative block cursor-pointer select-none',
        'has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-emerald',
        isDisabled && 'cursor-not-allowed',
        selectableCardVariants({ className, ring, selectedTone, state: visualState }),
        // Недоступный вариант без состояния проверки: приглушаем, как muted.
        isDisabled && !state && 'opacity-50 hover:border-line',
      )}
      data-state={visualState}
    >
      <input
        checked={checked}
        className="sr-only"
        disabled={isDisabled}
        name={group.name}
        onChange={() => {
          group.toggle(value)
        }}
        type={group.multiple ? 'checkbox' : 'radio'}
        value={value}
      />
      {children}
    </label>
  )
}

// Кружок-индикатор выбора из карточек ролей: 22px, рамка 2px, выбранный — заливка emerald с белым кольцом внутри.
export function RadioIndicator({ className }: Readonly<{ className?: string }>) {
  return (
    <span
      aria-hidden
      className={classNames(
        'size-5.5 shrink-0 rounded-full border-2 border-line-strong transition-colors',
        'group-data-[state=selected]/radio:border-emerald group-data-[state=selected]/radio:bg-emerald',
        'group-data-[state=selected]/radio:inset-ring-3 group-data-[state=selected]/radio:inset-ring-surface',
        className,
      )}
    />
  )
}
