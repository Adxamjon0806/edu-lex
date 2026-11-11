import { Award, QrCode, ShieldCheck } from 'lucide-react'

import { classNames } from '~/shared/lib'
import { Card } from '~/shared/ui'

import { MENTOR_TEXTS } from '../config/mentor'

type MentorCredentialsProps = Readonly<{
  className?: string
  documents: readonly string[]
  onToggle: (index: number) => void
  openIndex: null | number
}>

/*
 * «Дипломы и сертификаты» на десктопе: карточки документов (переключатели) и превью открытого документа
 * с QR. Выбранная карточка — мятный фон и рамка emerald. Hover в макете не нарисован: темнеет рамка.
 */
export function MentorCredentials({ className, documents, onToggle, openIndex }: MentorCredentialsProps) {
  const openDocument = openIndex === null ? undefined : documents[openIndex]

  return (
    <Card
      aria-labelledby="mentor-credentials"
      as="section"
      className={classNames('flex flex-col gap-3.5 p-6.5', className)}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-serif text-22 font-semibold text-heading" id="mentor-credentials">
          {MENTOR_TEXTS.credentials}
        </h2>
        <span className="text-13 font-semibold text-muted">{MENTOR_TEXTS.credentialsHint}</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {documents.map((document, index) => {
          const selected = index === openIndex
          return (
            <button
              aria-pressed={selected}
              className={classNames(
                'flex cursor-pointer flex-col gap-3 rounded-14 border-[1.5px] p-4 text-left transition-colors',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald',
                selected ? 'border-emerald bg-success-subtle' : 'border-line bg-surface hover:border-line-strong',
              )}
              key={document}
              onClick={() => {
                onToggle(index)
              }}
              type="button"
            >
              <span
                aria-hidden
                className="flex h-21 w-full items-center justify-center rounded-6 border border-line bg-background text-gold"
              >
                <Award className="size-7.5" />
              </span>
              <span className="text-14 leading-snug font-bold text-body">{document}</span>
              <span className="flex items-center gap-1 text-11 font-bold text-success">
                <ShieldCheck aria-hidden className="size-3.5" />
                {MENTOR_TEXTS.documentVerified}
              </span>
            </button>
          )
        })}
      </div>
      {openDocument !== undefined && (
        <div className="flex items-center gap-4.5 rounded-14 border border-line bg-background p-4.5">
          <span
            aria-hidden
            className="flex h-29 w-22.5 shrink-0 flex-col items-center justify-center gap-1.5 rounded-4 border border-gold bg-surface"
          >
            <Award className="size-7.5 text-gold" />
            <QrCode className="size-5.5 text-heading" />
          </span>
          <div className="flex flex-col gap-1.5">
            <p className="font-serif text-20 font-semibold text-heading">{openDocument}</p>
            <p className="text-13 font-semibold text-success">{MENTOR_TEXTS.documentVerifiedFull}</p>
            <p className="text-13 font-medium text-muted">{MENTOR_TEXTS.documentRegistry}</p>
          </div>
        </div>
      )}
    </Card>
  )
}
