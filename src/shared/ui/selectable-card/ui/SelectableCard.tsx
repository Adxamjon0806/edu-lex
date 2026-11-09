import type { HTMLAttributes } from 'react'

import { selectableCardVariants, type SelectableCardVariantsOptions } from '../lib/selectableCardVariants'

type SelectableCardProps = Omit<HTMLAttributes<HTMLDivElement>, 'className'> & SelectableCardVariantsOptions

// Внешний вид варианта выбора без поведения. Для выбора с клавиатуры и скринридером — Radio внутри RadioGroup.
export function SelectableCard({ className, ring, selectedTone, state, ...props }: SelectableCardProps) {
  return <div className={selectableCardVariants({ className, ring, selectedTone, state })} {...props} />
}
