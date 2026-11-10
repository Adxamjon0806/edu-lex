import { classNames } from '~/shared/lib'

/*
 * Варианты из дизайна:
 * - outline — белая круглая кнопка с рамкой (назад, закрыть, профиль);
 * - primary — emerald (отправить, микрофон в речевом тренажёре);
 * - danger — завершить звонок;
 * - danger-outline — удалить;
 * - on-navy — полупрозрачная кнопка на тёмном фоне (управление звонком).
 */
const variantClasses = {
  danger: 'bg-red text-white hover:bg-red-700',
  'danger-outline': 'border-line bg-surface text-danger hover:bg-danger-subtle',
  'on-navy': 'bg-white/10 text-white backdrop-blur-sm hover:bg-white/20',
  outline: 'border-line bg-surface text-body hover:bg-surface-muted',
  // Недоступная — серая (inactive) без прозрачности, как основная Button.
  primary:
    'bg-emerald text-white hover:bg-emerald-700 disabled:bg-inactive disabled:opacity-100 aria-disabled:bg-inactive aria-disabled:opacity-100',
} as const

// Размеры в пикселях макета: 36–60. Иконка растёт вместе с кнопкой, как font-size иконок в дизайне.
const sizeClasses = {
  36: 'size-9 [&_svg]:size-4',
  40: 'size-10 [&_svg]:size-4.5',
  44: 'size-11 [&_svg]:size-4.5',
  48: 'size-12 [&_svg]:size-5',
  52: 'size-13 [&_svg]:size-5',
  56: 'size-14 [&_svg]:size-5',
  60: 'size-15 [&_svg]:size-5.5',
} as const

export type IconButtonSize = keyof typeof sizeClasses
export type IconButtonVariant = keyof typeof variantClasses

export type IconButtonVariantsOptions = Readonly<{
  className?: string
  /** Свечение, как у основных круглых кнопок на тёмном фоне. */
  glow?: boolean
  /** Квадратные кнопки в макете есть только с размерами до 44px. */
  shape?: 'circle' | 'square'
  size?: IconButtonSize
  variant?: IconButtonVariant
}>

// Классы кнопки-иконки. Нужны и для ссылок: <Link className={iconButtonVariants()} aria-label="…">.
export function iconButtonVariants({
  className,
  glow = false,
  shape = 'circle',
  size = 44,
  variant = 'outline',
}: IconButtonVariantsOptions = {}) {
  return classNames(
    'inline-flex shrink-0 cursor-pointer items-center justify-center border border-transparent transition-colors select-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald',
    'active:translate-y-px',
    'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
    shape === 'circle' && 'rounded-full',
    // Радиус квадратных кнопок в макете: 10px у маленьких, 12px у остальных.
    shape === 'square' && (size <= 40 ? 'rounded-10' : 'rounded-12'),
    variantClasses[variant],
    sizeClasses[size],
    glow && 'shadow-glow',
    className,
  )
}
