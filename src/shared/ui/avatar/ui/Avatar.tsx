import { classNames } from '~/shared/lib'

// Размеры в пикселях макета: 42 — шапка на мобильном, 44 — на планшете и десктопе.
const sizeClasses = {
  42: 'size-10.5 text-14',
  44: 'size-11 text-15',
} as const

export type AvatarSize = keyof typeof sizeClasses

type AvatarProps = Readonly<{
  className?: string
  /** Инициалы, которые видно в кружке, например «АК». */
  initials: string
  /** Полное имя для скринридера: инициалы сами по себе ничего не говорят. */
  name: string
  size?: AvatarSize
}>

// Аватар пользователя без фото: золотые инициалы на тёмно-синем круге, как в шапке главной.
export function Avatar({ className, initials, name, size = 44 }: AvatarProps) {
  return (
    <span
      aria-label={name}
      className={classNames(
        'inline-flex shrink-0 items-center justify-center rounded-full bg-navy font-bold text-gold-400',
        sizeClasses[size],
        className,
      )}
      role="img"
    >
      <span aria-hidden>{initials}</span>
    </span>
  )
}
