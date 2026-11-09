import type { ComponentProps } from 'react'

import type { LucideIcon } from 'lucide-react'

import { classNames } from '~/shared/lib'

import { Spinner } from '../../spinner'
import { buttonVariants, type ButtonVariantsOptions } from '../lib/buttonVariants'

type ButtonProps = ButtonVariantsOptions &
  Omit<ComponentProps<'button'>, 'className'> &
  Readonly<{
    iconEnd?: LucideIcon
    iconStart?: LucideIcon
    /** Пока идёт действие, кнопка недоступна и показывает спиннер вместо содержимого. */
    loading?: boolean
  }>

export function Button({
  children,
  className,
  disabled,
  fullWidth,
  iconEnd: IconEnd,
  iconStart: IconStart,
  loading = false,
  size,
  type = 'button',
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      aria-busy={loading || undefined}
      className={buttonVariants({ className, fullWidth, size, variant })}
      disabled={disabled === true || loading}
      type={type}
      {...props}
    >
      {/* Во время загрузки содержимое прозрачное, а не удалённое: ширина кнопки не меняется, а скринридер
          по-прежнему читает подпись (visibility: hidden убрала бы её из дерева доступности). */}
      <span className={classNames('inline-flex items-center gap-[inherit]', loading && 'opacity-0')}>
        {IconStart && <IconStart aria-hidden />}
        {children}
        {IconEnd && <IconEnd aria-hidden />}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner label="" />
        </span>
      )}
    </button>
  )
}
