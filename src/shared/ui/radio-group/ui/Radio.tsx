import type { ReactNode } from 'react'

import { classNames } from '~/shared/lib'

import {
  selectableCardVariants,
  type SelectableCardSelectedTone,
  type SelectableCardState,
  type SelectableCardSurface,
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
  surface?: SelectableCardSurface
  value: string
}>

/*
 * Вариант внутри RadioGroup: label с нативным radio или checkbox (визуально скрыт) и карточкой SelectableCard.
 * Состояние выставлено в data-state ("default", "selected", "success", "danger", "muted"): содержимое
 * перекрашивается через group-data-[state=…]/radio, а индикатор — через RadioIndicator.
 */
export function Radio({
  children,
  className,
  disabled = false,
  ring,
  selectedTone,
  state,
  surface,
  value,
}: RadioProps) {
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
        selectableCardVariants({ className, ring, selectedTone, state: visualState, surface }),
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

/*
 * Кружок-индикатор выбора, 22px с рамкой 2px:
 * - emerald (карточки ролей) — выбранный залит emerald с кольцом цвета поверхности внутри;
 * - gold (тарифы подписки на navy) — рамка всегда золотая, выбранный залит золотом с кольцом navy-900.
 */
const indicatorToneClasses = {
  emerald: classNames(
    'border-line-strong',
    'group-data-[state=selected]/radio:border-emerald group-data-[state=selected]/radio:bg-emerald',
    'group-data-[state=selected]/radio:inset-ring-3 group-data-[state=selected]/radio:inset-ring-surface',
  ),
  gold: classNames(
    'border-gold',
    'group-data-[state=selected]/radio:bg-gold',
    'group-data-[state=selected]/radio:inset-ring-3 group-data-[state=selected]/radio:inset-ring-navy-900',
  ),
} as const

export function RadioIndicator({
  className,
  tone = 'emerald',
}: Readonly<{ className?: string; tone?: keyof typeof indicatorToneClasses }>) {
  return (
    <span
      aria-hidden
      className={classNames(
        'size-5.5 shrink-0 rounded-full border-2 transition-colors',
        indicatorToneClasses[tone],
        className,
      )}
    />
  )
}
