import { Download, QrCode, Share2 } from 'lucide-react'

import { classNames } from '~/shared/lib'
import { Button, IconButton } from '~/shared/ui'

import type { Certificate } from '../model/types'

/*
 * Сертификат в трёх видах из макета:
 * - до md — строка: QR 44px, название и короткая подпись, кнопка-иконка скачивания;
 * - md–lg — строка: QR 56px, название и подпись, кнопка «PDF»;
 * - от lg — карточка: знак EduLex и QR, название, подпись, статус, «PDF» и «Поделиться».
 * Выданный — с золотой рамкой; невыданный приглушён, скачать его нельзя.
 */
export function CertificateCard({ certificate }: Readonly<{ certificate: Certificate }>) {
  const { issued, meta, short, status, title } = certificate
  const pdfLabel = `Скачать PDF: ${title}`

  return (
    <li
      className={classNames(
        'flex items-center gap-3 rounded-14 border-[1.5px] bg-surface p-3.5',
        'md:gap-4 md:rounded-16 md:p-4.5 lg:flex-col lg:items-stretch lg:gap-3 lg:rounded-18 lg:p-5.5',
        issued ? 'border-gold' : 'border-line opacity-60',
      )}
    >
      <div className="flex shrink-0 items-start justify-between">
        <img alt="" className="h-9.5 w-8.5 rounded-6 bg-navy object-cover max-lg:hidden" src="/edulex-mark.png" />
        <span
          aria-hidden
          className="flex size-11 items-center justify-center rounded-8 border border-line text-heading md:size-14"
        >
          <QrCode className="size-6.5 md:size-8.5" />
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 md:gap-1 lg:gap-3">
        <h3 className="font-serif text-16 font-semibold text-heading md:text-20 lg:text-22">{title}</h3>
        <p className="text-12 font-medium text-muted md:text-13">
          <span className="md:hidden">{short}</span>
          <span className="max-md:hidden">{meta}</span>
        </p>
        <p className={classNames('text-12 font-semibold max-lg:hidden', issued ? 'text-premium' : 'text-muted')}>
          {status}
        </p>
      </div>
      <div className="flex gap-2 lg:mt-1">
        <IconButton
          aria-label={pdfLabel}
          className="rounded-10 md:hidden"
          disabled={!issued}
          icon={Download}
          shape="square"
          variant="primary"
        />
        <Button
          aria-label={pdfLabel}
          className="max-md:hidden md:px-4 md:py-2.75 lg:flex-1"
          disabled={!issued}
          iconStart={Download}
          size="sm"
        >
          PDF
        </Button>
        <IconButton
          aria-label={`Поделиться: ${title}`}
          className="max-lg:hidden"
          icon={Share2}
          shape="square"
          size={40}
        />
      </div>
    </li>
  )
}
