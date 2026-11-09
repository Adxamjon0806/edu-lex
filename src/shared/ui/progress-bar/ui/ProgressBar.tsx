import { classNames } from '~/shared/lib'

// Высота полоски в пикселях макета: 4, 5, 6 или 8.
const sizeClasses = {
  4: 'h-1',
  5: 'h-1.25',
  6: 'h-1.5',
  8: 'h-2',
} as const

// Дорожка: на светлом фоне — track (или светлее, surface-muted, как в карточках главной), на тёмно-синем — navy-600.
const trackClasses = {
  light: 'bg-track',
  muted: 'bg-surface-muted',
  navy: 'bg-navy-600',
} as const

// Заливка: сплошная emerald или градиент emerald → emerald-500, как у прогресса курса.
const fillClasses = {
  emerald: 'bg-emerald',
  gradient: 'bg-linear-to-r from-emerald to-emerald-500',
} as const

export type ProgressBarSize = keyof typeof sizeClasses

type ProgressBarProps = Readonly<{
  className?: string
  fill?: keyof typeof fillClasses
  /** Свечение заливки, как на тёмно-синем фоне в макете. */
  glow?: boolean
  /** Подпись для скринридера: что именно показывает полоска. */
  label: string
  size?: ProgressBarSize
  track?: keyof typeof trackClasses
  /** Значение в процентах, 0–100. */
  value: number
  /** Текст значения для скринридера вместо процентов, например «Шаг 2 из 4». */
  valueText?: string
}>

export function ProgressBar({
  className,
  fill = 'emerald',
  glow = false,
  label,
  size = 4,
  track = 'light',
  value,
  valueText,
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, value))

  return (
    <div
      aria-label={label}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={percent}
      aria-valuetext={valueText}
      className={classNames('w-full rounded-full', sizeClasses[size], trackClasses[track], className)}
      role="progressbar"
    >
      <div
        className={classNames(
          'h-full rounded-full transition-[width] duration-300',
          fillClasses[fill],
          glow && 'shadow-glow',
        )}
        style={{ width: `${String(percent)}%` }}
      />
    </div>
  )
}
