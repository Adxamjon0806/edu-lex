import { Award, FileCheck } from 'lucide-react'

import { classNames } from '~/shared/lib'
import { Chip } from '~/shared/ui'

import { MENTOR_TEXTS } from '../config/mentor'

type DocumentChipsProps = Readonly<{
  className?: string
  documents: readonly string[]
  onToggle: (index: number) => void
  openIndex: null | number
}>

/*
 * Документы ментора до lg: чипы-переключатели и короткое превью открытого документа.
 * До md чипы крупнее (от 44px) и прокручиваются вбок от края до края экрана (отменяют отступ лейаута px-5).
 * На десктопе вместо них — карточки документов (MentorCredentials).
 */
export function DocumentChips({ className, documents, onToggle, openIndex }: DocumentChipsProps) {
  const openDocument = openIndex === null ? undefined : documents[openIndex]

  return (
    <div className={classNames('flex flex-col gap-3.5 md:gap-2.5', className)}>
      <div
        aria-label="Документы"
        className="flex gap-2 max-md:-mx-5 max-md:overflow-x-auto max-md:px-5 md:flex-wrap"
        role="group"
      >
        {documents.map((document, index) => (
          <Chip
            className="max-md:min-h-11 max-md:rounded-10 max-md:px-3 md:py-2"
            icon={FileCheck}
            key={document}
            onClick={() => {
              onToggle(index)
            }}
            selected={index === openIndex}
            size="sm"
            tone="emerald"
          >
            {document}
          </Chip>
        ))}
      </div>
      {openDocument !== undefined && (
        <div className="flex items-center gap-3 rounded-12 border border-line bg-surface p-3 md:gap-3.5 md:bg-background md:p-3.5">
          <Award aria-hidden className="size-6 shrink-0 text-gold md:size-7" />
          <div className="flex flex-col md:gap-0.5">
            <p className="text-13 font-bold text-heading md:text-14">{openDocument}</p>
            <p className="text-11 font-semibold text-success md:text-12">
              <span className="md:hidden">{MENTOR_TEXTS.documentVerifiedMobile}</span>
              <span className="max-md:hidden">{MENTOR_TEXTS.documentVerifiedTablet}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
