import { classNames } from '~/shared/lib'
import { Badge, Card } from '~/shared/ui'

import { LEARNED_TERMS } from '../config/learning'
import type { Term } from '../model/types'

type TermStatus = 'current' | 'learned' | 'new'

const STATUS_LABELS = {
  current: 'Сейчас',
  learned: 'Выучено',
  new: 'Новое',
} as const satisfies Record<TermStatus, string>

// Метки статусов из макета: «Выучено» — мятная, «Сейчас» — белая на мятной строке, «Новое» — серая.
const STATUS_CLASSES = {
  current: 'bg-surface',
  learned: '',
  new: 'bg-surface-muted text-muted',
} as const satisfies Record<TermStatus, string>

type ModuleTermsListProps = Readonly<{
  className?: string
  currentIndex: number
  terms: readonly Term[]
}>

// Термины модуля со статусами: выученные раньше, затем колода, где термины до текущего — выучены.
export function ModuleTermsList({ className, currentIndex, terms }: ModuleTermsListProps) {
  const items: readonly Readonly<{ en: string; ru: string; status: TermStatus }>[] = [
    ...LEARNED_TERMS.map(({ en, ru }) => ({ en, ru, status: 'learned' as const })),
    ...terms.map(({ en, ru }, index) => ({ en, ru, status: getDeckStatus(index, currentIndex) })),
  ]

  return (
    <Card
      aria-labelledby="module-terms-title"
      as="section"
      className={classNames('flex flex-col gap-1.5 self-start p-5.5', className)}
    >
      <h2 className="mb-2 font-serif text-20 font-semibold text-heading" id="module-terms-title">
        Термины модуля
      </h2>
      <ul className="flex flex-col gap-1.5">
        {items.map(({ en, ru, status }) => (
          <li
            aria-current={status === 'current' ? 'step' : undefined}
            className={classNames(
              'flex items-center justify-between gap-3 rounded-10 px-3 py-2.5',
              status === 'current' && 'bg-selected',
            )}
            key={en}
          >
            <span className="flex flex-col">
              <span className="text-14 font-bold">{en}</span>
              <span className="text-12 font-medium text-muted">{ru}</span>
            </span>
            <Badge className={STATUS_CLASSES[status]} size="sm" tone="success">
              {STATUS_LABELS[status]}
            </Badge>
          </li>
        ))}
      </ul>
    </Card>
  )
}

function getDeckStatus(index: number, currentIndex: number): TermStatus {
  if (index === currentIndex) return 'current'
  return index < currentIndex ? 'learned' : 'new'
}
