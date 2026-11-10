import { classNames } from '~/shared/lib'

/*
 * Варианты из дизайна:
 * - primary — основное действие (emerald);
 * - secondary — вторичное действие с рамкой navy («Подробнее», «Все материалы»);
 * - outline — нейтральная кнопка с рамкой («Назад», «Пропустить»);
 * - ghost — текстовая кнопка без рамки;
 * - danger — опасное действие (завершить звонок);
 * - danger-outline — опасное действие в спокойном виде (удалить, отказаться);
 * - on-navy — кнопка на тёмно-синем фоне.
 * Hover и active в макете не нарисованы: выведены из палитры (на тон темнее или приглушённый фон).
 * Недоступная primary в макете серая (inactive) без прозрачности; во время загрузки (aria-busy) она остаётся emerald.
 */
const variantClasses = {
  danger: 'bg-red font-bold text-white hover:bg-red-700',
  'danger-outline': 'border-red-300 bg-surface font-bold text-danger hover:bg-danger-subtle',
  ghost: 'font-semibold text-muted hover:bg-surface-muted hover:text-heading',
  'on-navy': 'border-navy-400 font-bold text-white hover:bg-navy-800',
  outline: 'border-line-strong font-semibold text-body hover:bg-surface-muted',
  primary: classNames(
    'bg-emerald font-bold text-white hover:bg-emerald-700',
    'disabled:not-aria-busy:bg-inactive disabled:not-aria-busy:opacity-100 aria-disabled:bg-inactive aria-disabled:opacity-100',
  ),
  secondary: 'border-line-accent font-bold text-heading hover:bg-surface-muted',
} as const

// Рамка 1.5px есть у всех вариантов (у заливных — прозрачная), чтобы кнопки одного размера были одной высоты.
const sizeClasses = {
  lg: 'gap-2.5 rounded-12 px-6 py-3.75 text-16 [&_svg]:size-4.5',
  md: 'gap-2 rounded-12 px-5 py-3 text-14 [&_svg]:size-4',
  sm: 'gap-1.5 rounded-10 px-3.5 py-2 text-13 [&_svg]:size-3.5',
} as const

export type ButtonSize = keyof typeof sizeClasses
export type ButtonVariant = keyof typeof variantClasses

export type ButtonVariantsOptions = Readonly<{
  className?: string
  fullWidth?: boolean
  size?: ButtonSize
  variant?: ButtonVariant
}>

// Классы кнопки. Нужны и для ссылок, которые выглядят как кнопки: <Link className={buttonVariants()}>.
export function buttonVariants({
  className,
  fullWidth = false,
  size = 'md',
  variant = 'primary',
}: ButtonVariantsOptions = {}) {
  return classNames(
    'relative inline-flex cursor-pointer items-center justify-center border-[1.5px] border-transparent text-center whitespace-nowrap transition-colors select-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald',
    'active:translate-y-px',
    'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    className,
  )
}
