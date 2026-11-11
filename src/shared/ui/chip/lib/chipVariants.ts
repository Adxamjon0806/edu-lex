import { classNames } from '~/shared/lib'

/*
 * Тона выбранного состояния из дизайна:
 * - navy — фильтры (направление, регион): выбранный чип залит navy;
 * - emerald — отметка элемента (документы ментора): мятный фон и рамка emerald.
 * Невыбранный чип у обоих тонов белый с рамкой. Hover в макете не нарисован: приглушённый фон.
 */
const toneClasses = {
  // Иконка у этого тона зелёная в обоих состояниях, как значок документа в макете.
  emerald: {
    off: 'border-line bg-surface text-body hover:bg-surface-muted [&_svg]:text-success',
    on: 'border-emerald bg-success-subtle text-body [&_svg]:text-success',
  },
  navy: {
    off: 'border-line bg-surface text-body hover:bg-surface-muted',
    // В тёмной теме рамка выбранного чипа мятная (line-accent), как в карте замен бандла.
    on: 'border-line-accent bg-navy text-white hover:bg-navy',
  },
} as const

const sizeClasses = {
  md: 'gap-2 rounded-full px-4.5 py-2.25 text-14 [&_svg]:size-4',
  sm: 'gap-1.5 rounded-8 px-2.5 py-1.75 text-12 [&_svg]:size-3.5',
} as const

export type ChipSize = keyof typeof sizeClasses
export type ChipTone = keyof typeof toneClasses

export type ChipVariantsOptions = Readonly<{
  className?: string
  selected: boolean
  size?: ChipSize
  tone?: ChipTone
}>

// Классы чипа: общие для Chip (кнопка-переключатель) и вариантов ChipGroup (radio в label).
export function chipVariants({ className, selected, size = 'md', tone = 'navy' }: ChipVariantsOptions) {
  return classNames(
    'inline-flex shrink-0 cursor-pointer items-center border-[1.5px] font-semibold whitespace-nowrap transition-colors select-none',
    'active:translate-y-px',
    sizeClasses[size],
    toneClasses[tone][selected ? 'on' : 'off'],
    className,
  )
}
