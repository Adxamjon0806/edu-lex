import { classNames } from '~/shared/lib'

/*
 * Состояния варианта выбора из макета:
 * - default — белый с рамкой line;
 * - selected — выбран (тон emerald: роли, направления; тон navy: ответ квиза до проверки);
 * - success / danger — верный и неверный ответ после проверки;
 * - muted — остальные ответы после проверки (прозрачность 50%).
 * Hover в макете не нарисован: у невыбранного варианта темнеет рамка.
 */
const stateClasses = {
  danger: 'border-red-300 bg-danger-subtle',
  default: 'border-line bg-surface hover:border-line-strong',
  muted: 'border-line bg-surface opacity-50',
  success: 'border-emerald bg-success-subtle',
} as const

const selectedToneClasses = {
  emerald: 'border-emerald bg-selected',
  navy: 'border-line-accent bg-surface-muted',
} as const

export type SelectableCardSelectedTone = keyof typeof selectedToneClasses
export type SelectableCardState = 'selected' | keyof typeof stateClasses

export type SelectableCardVariantsOptions = Readonly<{
  className?: string
  /** Кольцо вокруг выбранного варианта, как у карточек ролей. */
  ring?: boolean
  selectedTone?: SelectableCardSelectedTone
  state?: SelectableCardState
}>

// Классы карточки-варианта. Радиус по умолчанию 14px, отступы и раскладку задаёт место использования.
export function selectableCardVariants({
  className,
  ring = false,
  selectedTone = 'emerald',
  state = 'default',
}: SelectableCardVariantsOptions = {}) {
  return classNames(
    'rounded-14 border-[1.5px] text-left transition-all duration-200',
    state === 'selected' ? selectedToneClasses[selectedTone] : stateClasses[state],
    ring && state === 'selected' && 'ring-4 ring-emerald/12',
    className,
  )
}
