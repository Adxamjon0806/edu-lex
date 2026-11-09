import { LoaderCircle } from 'lucide-react'

import { classNames } from '~/shared/lib'

type SpinnerProps = Readonly<{
  className?: string
  /** Текст для скринридера. Пустая строка — спиннер декоративный (например, рядом уже есть aria-busy). */
  label?: string
}>

// Индикатор загрузки. Размер и цвет наследует от текста: задавай их через className (size-*, text-*).
export function Spinner({ className, label = 'Загрузка…' }: SpinnerProps) {
  const icon = <LoaderCircle aria-hidden className={classNames('size-4 animate-spin', className)} />

  if (!label) return icon

  return (
    <span className="inline-flex" role="status">
      {icon}
      <span className="sr-only">{label}</span>
    </span>
  )
}
