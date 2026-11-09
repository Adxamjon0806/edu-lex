import { classNames } from '~/shared/lib'

/*
 * Размеры из макета: знак (ширина × высота), название и отступ между ними.
 * 36×40 — онбординг на мобильном, 38×42 — боковая панель, 40×44 — узкая колонка,
 * 44×48 — онбординг на планшете, 52×57 — онбординг на десктопе.
 */
const sizeClasses = {
  36: { gap: 'gap-2.5', mark: 'h-10 w-9', name: 'text-22' },
  38: { gap: 'gap-3', mark: 'h-10.5 w-9.5', name: 'text-24' },
  40: { gap: 'gap-3', mark: 'h-11 w-10', name: 'text-24' },
  44: { gap: 'gap-3', mark: 'h-12 w-11', name: 'text-26' },
  52: { gap: 'gap-3.5', mark: 'h-14.25 w-13', name: 'text-28' },
} as const

export type LogoSize = keyof typeof sizeClasses

type LogoProps = Readonly<{
  className?: string
  /** Классы названия. Скрывать его — через sr-only (например, max-lg:sr-only), чтобы логотип не остался без подписи. */
  nameClassName?: string
  size?: LogoSize
  /** Подпись под названием, как «EDTECH PLATFORM» на онбординге. */
  tagline?: string
  withName?: boolean
}>

export function Logo({ className, nameClassName, size = 38, tagline, withName = true }: LogoProps) {
  const { gap, mark, name } = sizeClasses[size]

  return (
    <span className={classNames('inline-flex items-center', gap, className)}>
      {/* Если рядом есть название, знак декоративный: иначе скринридер прочитает «EduLex» дважды.
          Поэтому прятать название на узких экранах нужно через sr-only, а не hidden. */}
      <img
        alt={withName ? '' : 'EduLex'}
        className={classNames('shrink-0 object-cover', mark)}
        src="/edulex-mark.png"
      />
      {withName && (
        <span className={classNames('flex flex-col', nameClassName)}>
          <span className={classNames('font-serif leading-none font-bold text-gold-400 italic', name)}>EduLex</span>
          {tagline && <span className="text-12 font-medium tracking-widest text-navy-200">{tagline}</span>}
        </span>
      )}
    </span>
  )
}
