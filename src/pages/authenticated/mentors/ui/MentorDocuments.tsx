import { Award, FileCheck } from 'lucide-react'

import { Chip } from '~/shared/ui'

import { BOOKING_TEXTS } from '../config/mentors'

type MentorDocumentsProps = Readonly<{
  documents: readonly string[]
  onToggle: (index: number) => void
  /** Открытый документ; null — ни один не открыт. */
  openIndex: null | number
}>

/*
 * Подтверждённые документы ментора: чипы-переключатели, открытый документ показывается ниже.
 * Заголовок и превью документа в макете есть только на десктопе, на планшете — только чипы.
 */
export function MentorDocuments({ documents, onToggle, openIndex }: MentorDocumentsProps) {
  const openDocument = openIndex === null ? undefined : documents[openIndex]

  return (
    <div className="flex flex-col gap-2">
      <p className="text-12 font-bold tracking-wider text-muted max-lg:hidden">{BOOKING_TEXTS.documentsTitle}</p>
      <div className="flex flex-wrap gap-2">
        {documents.map((document, index) => (
          <Chip
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
        <div className="flex items-center gap-3.5 rounded-12 border border-line bg-background p-3.5 max-lg:hidden">
          <span
            aria-hidden
            className="flex h-18 w-14 shrink-0 items-center justify-center rounded-4 border border-line bg-surface text-gold"
          >
            <Award className="size-6" />
          </span>
          <span className="flex flex-col gap-1">
            <span className="text-14 font-bold text-heading">{openDocument}</span>
            <span className="text-12 font-semibold text-success">{BOOKING_TEXTS.documentVerified}</span>
          </span>
        </div>
      )}
    </div>
  )
}
