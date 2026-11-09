import type { ComponentProps } from 'react'

import type { LucideIcon } from 'lucide-react'

import { iconButtonVariants, type IconButtonVariantsOptions } from '../lib/iconButtonVariants'

type IconButtonProps = IconButtonVariantsOptions &
  Omit<ComponentProps<'button'>, 'aria-label' | 'children' | 'className'> &
  Readonly<{
    /** У кнопки нет текста, поэтому подпись обязательна: её читает скринридер. */
    'aria-label': string
    icon: LucideIcon
  }>

export function IconButton({
  className,
  glow,
  icon: Icon,
  shape,
  size,
  type = 'button',
  variant,
  ...props
}: IconButtonProps) {
  return (
    <button className={iconButtonVariants({ className, glow, shape, size, variant })} type={type} {...props}>
      <Icon aria-hidden />
    </button>
  )
}
