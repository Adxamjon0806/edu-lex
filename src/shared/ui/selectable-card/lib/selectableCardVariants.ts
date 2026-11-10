import { classNames } from '~/shared/lib'

/*
 * Состояния варианта выбора из макета:
 * - default — белый с рамкой line;
 * - selected — выбран (тон emerald: роли, направления; тон navy: ответ квиза до проверки);
 * - success / danger — верный и неверный ответ после проверки;
 * - muted — остальные ответы после проверки (прозрачность 50%).
 * Hover в макете не нарисован: у невыбранного варианта темнеет рамка.
 * Поверхность navy — варианты на тёмно-синем фоне (тарифы и способы оплаты подписки): там свои цвета
 * рамок и фона, одинаковые в обеих темах; состояний проверки ответа на ней нет.
 */
const stateClasses = {
  danger: 'border-red-300 bg-danger-subtle',
  default: 'border-line bg-surface hover:border-line-strong',
  muted: 'border-line bg-surface opacity-50',
  success: 'border-emerald bg-success-subtle',
} as const

const selectedToneClasses = {
  emerald: 'border-emerald bg-selected',
  gold: 'border-gold bg-gold/7 shadow-2xl ring-4 ring-gold/14',
  navy: 'border-line-accent bg-surface-muted',
} as const

// Цвета на тёмно-синей поверхности: невыбранный вариант и выбранный по тону.
// Тона navy на тёмно-синем в макете нет: для него взята светлая рамка, чтобы выбор был виден.
const navySurfaceClasses = {
  default: 'border-navy-500 bg-white/2 hover:border-navy-400',
  emerald: 'border-emerald bg-emerald/12',
  gold: selectedToneClasses.gold,
  navy: 'border-navy-200 bg-white/5',
} as const

export type SelectableCardSelectedTone = keyof typeof selectedToneClasses
export type SelectableCardState = 'selected' | keyof typeof stateClasses
export type SelectableCardSurface = 'light' | 'navy'

export type SelectableCardVariantsOptions = Readonly<{
  className?: string
  /** Кольцо вокруг выбранного варианта, как у карточек ролей. */
  ring?: boolean
  selectedTone?: SelectableCardSelectedTone
  state?: SelectableCardState
  /** Фон под карточкой: светлая поверхность темы или тёмно-синий (navy). */
  surface?: SelectableCardSurface
}>

// Классы карточки-варианта. Радиус по умолчанию 14px, отступы и раскладку задаёт место использования.
export function selectableCardVariants({
  className,
  ring = false,
  selectedTone = 'emerald',
  state = 'default',
  surface = 'light',
}: SelectableCardVariantsOptions = {}) {
  return classNames(
    'rounded-14 border-[1.5px] text-left transition-all duration-200',
    surface === 'navy' && (state === 'selected' ? navySurfaceClasses[selectedTone] : navySurfaceClasses.default),
    surface === 'light' && (state === 'selected' ? selectedToneClasses[selectedTone] : stateClasses[state]),
    ring && state === 'selected' && 'ring-4 ring-emerald/12',
    className,
  )
}
