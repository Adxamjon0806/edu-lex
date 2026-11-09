import type { LucideIcon } from 'lucide-react'

import { classNames } from '~/shared/lib'
import { ProgressBar } from '~/shared/ui'

type TrackCardProps = Readonly<{
  className?: string
  /** Английское название направления, видно только на десктопе. */
  en: string
  icon: LucideIcon
  meta: string
  onSelect: () => void
  /** Прогресс трека в процентах, 0 — трек ещё не начат («Новый»). */
  progress: number
  selected: boolean
  title: string
}>

/*
 * Карточка профильного трека с главной. Выбор трека отмечается рамкой navy и тенью.
 * Вид по ширине (значения из макета):
 * - до md — узкая карточка 150px для горизонтальной прокрутки: иконка, название, полоска 5px;
 * - md–lg — иконка на мятной плашке, процент, название, состав трека;
 * - от lg — то же, крупнее, и английское название.
 * Hover в макете не нарисован: у невыбранной карточки темнеет рамка.
 */
export function TrackCard({ className, en, icon: Icon, meta, onSelect, progress, selected, title }: TrackCardProps) {
  return (
    <button
      aria-pressed={selected}
      className={classNames(
        'flex h-full w-37.5 cursor-pointer flex-col gap-2 rounded-14 border-[1.5px] bg-surface p-3.5 text-left transition-all duration-200',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald active:translate-y-px',
        'md:w-full md:gap-2.5 md:rounded-16 md:p-4.5 lg:gap-3 lg:p-5',
        selected ? 'border-line-accent md:shadow-raised' : 'border-line hover:border-line-strong',
        className,
      )}
      onClick={onSelect}
      type="button"
    >
      <span className="flex w-full items-start justify-between">
        <span className="flex items-center justify-center text-success md:size-10 md:rounded-10 md:bg-success-subtle lg:size-11 lg:rounded-12">
          <Icon aria-hidden className="size-5 md:size-4.5 lg:size-5" />
        </span>
        <span className="text-13 font-bold text-success max-md:hidden">
          {progress > 0 ? `${String(progress)}%` : 'Новый'}
        </span>
      </span>
      <span className="flex min-h-8.5 flex-col md:min-h-0">
        <span className="text-13 leading-snug font-bold text-heading md:text-15 lg:text-16">{title}</span>
        <span className="mt-1.5 text-13 font-medium text-muted max-lg:hidden">{en}</span>
      </span>
      <span className="text-12 font-medium text-muted max-md:hidden">{meta}</span>
      <ProgressBar
        className="mt-auto md:h-1.5"
        label={`Прогресс трека «${title}»`}
        size={5}
        track="muted"
        value={progress}
      />
    </button>
  )
}
