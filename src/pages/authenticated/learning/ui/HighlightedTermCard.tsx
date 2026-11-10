import { classNames } from '~/shared/lib'
import { Card } from '~/shared/ui'

import type { HighlightedTerm } from '../model/types'

type HighlightedTermCardProps = Readonly<{
  className?: string
  term: HighlightedTerm
}>

/*
 * Карточка термина, выбранного в тексте кейса. Скринридер объявляет смену термина (aria-live).
 * Перевода и определения может не быть: тогда показывается только то, что есть.
 */
export function HighlightedTermCard({ className, term: { definition, en, ru } }: HighlightedTermCardProps) {
  return (
    <Card aria-live="polite" as="aside" className={classNames('flex flex-col gap-2.5 p-5.5', className)}>
      <p className="text-12 font-bold tracking-wider text-muted">ВЫДЕЛЕННЫЙ ТЕРМИН</p>
      <p className="font-serif text-22 font-semibold text-heading">{en}</p>
      {ru !== undefined && <p className="text-14 font-medium text-success">{ru}</p>}
      {definition !== undefined && <p className="text-14 leading-normal text-body-secondary">{definition}</p>}
    </Card>
  )
}
