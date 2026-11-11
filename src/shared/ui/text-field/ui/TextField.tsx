import { useId, useState, type ComponentProps, type ReactNode } from 'react'

import { Eye, EyeOff, type LucideIcon } from 'lucide-react'

import { classNames } from '~/shared/lib'

// Размеры из макета: sm — поиск (радиус 12, текст 14px), md — поля анкеты (радиус 10, текст 15px),
// lg — поля входа (радиус 12, текст 16px).
const sizeClasses = {
  lg: { box: 'gap-2.5 rounded-12 px-4', input: 'py-3.75 text-16' },
  md: { box: 'gap-2.5 rounded-10 px-4', input: 'py-3.25 text-14 md:py-3.5 md:text-15' },
  sm: { box: 'gap-2.5 rounded-12 px-3.5 md:px-4', input: 'py-3 text-14' },
} as const

type TextFieldProps = Omit<ComponentProps<'input'>, 'className' | 'id' | 'size' | 'type'> &
  Readonly<{
    className?: string
    /** Текст ошибки: красит рамку и связывается с полем через aria-describedby. */
    error?: string
    /** Подсказка под полем (например, надёжность пароля). */
    hint?: ReactNode
    /** Иконка слева, как в полях входа. */
    icon?: LucideIcon
    label: string
    /** Действие справа от подписи, например ссылка «Забыли пароль?». */
    labelAction?: ReactNode
    /** Подпись только для скринридера: в макете у поля поиска её не видно. */
    labelHidden?: boolean
    size?: keyof typeof sizeClasses
    /** Элемент справа внутри поля, например кнопка фильтров у поиска. */
    trailing?: ReactNode
    /** password добавляет кнопку «показать пароль». */
    type?: 'email' | 'password' | 'search' | 'tel' | 'text'
  }>

/*
 * Поле ввода с подписью. Фокус и ошибка в макете не нарисованы: фокус — рамка emerald с кольцом,
 * как у активной ячейки кода подтверждения; ошибка — рамка red-300 и текст danger под полем.
 */
export function TextField({
  className,
  disabled,
  error,
  hint,
  icon: Icon,
  label,
  labelAction,
  labelHidden = false,
  size = 'lg',
  trailing,
  type = 'text',
  ...props
}: TextFieldProps) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const isPassword = type === 'password'
  const hasHint = hint !== undefined && hint !== null && hint !== false
  const describedBy = [hasHint && hintId, error && errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={classNames('flex flex-col gap-1.5 md:gap-2', className)}>
      <div className={classNames('flex items-center justify-between gap-3', labelHidden && 'sr-only')}>
        <label className="text-12 font-semibold text-muted md:text-13" htmlFor={id}>
          {label}
        </label>
        {labelAction}
      </div>
      <div
        className={classNames(
          'flex items-center border-[1.5px] bg-surface transition-[border-color,box-shadow]',
          'focus-within:border-emerald focus-within:ring-4 focus-within:ring-emerald/14',
          error ? 'border-red-300' : 'border-line',
          disabled && 'bg-surface-muted opacity-60',
          sizeClasses[size].box,
          (isPassword || trailing !== undefined) && 'pr-1',
        )}
      >
        {Icon && <Icon aria-hidden className="size-4.5 shrink-0 text-muted" />}
        <input
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={classNames(
            'min-w-0 flex-1 bg-transparent font-medium text-body outline-none placeholder:text-muted disabled:cursor-not-allowed',
            sizeClasses[size].input,
          )}
          disabled={disabled}
          id={id}
          type={isPassword && isPasswordVisible ? 'text' : type}
          {...props}
        />
        {isPassword && (
          <button
            aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
            aria-pressed={isPasswordVisible}
            className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-10 text-muted transition-colors hover:text-heading focus-visible:outline-2 focus-visible:outline-emerald disabled:cursor-not-allowed"
            disabled={disabled}
            onClick={() => {
              setIsPasswordVisible((visible) => !visible)
            }}
            type="button"
          >
            {isPasswordVisible ? <EyeOff aria-hidden className="size-4.5" /> : <Eye aria-hidden className="size-4.5" />}
          </button>
        )}
        {trailing}
      </div>
      {hasHint && (
        <div className="flex flex-col gap-1" id={hintId}>
          {hint}
        </div>
      )}
      {error && (
        <p className="text-12 font-medium text-danger" id={errorId}>
          {error}
        </p>
      )}
    </div>
  )
}
