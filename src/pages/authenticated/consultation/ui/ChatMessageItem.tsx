import { FileText, ShieldAlert } from 'lucide-react'

import { classNames } from '~/shared/lib'

import type { ChatMessage } from '../model/types'

type ChatMessageItemProps = Readonly<{
  /** Ментор в подписи сообщения, например «Дилноза». */
  author: string
  /** Короткий вид планшета: без подписи «кто · когда», у плашки модерации — короткий текст. */
  compact?: boolean
  message: ChatMessage
}>

// Сообщение чата: ментора — слева, своё — справа (emerald), плашка автомодерации — золотая.
export function ChatMessageItem({ author, compact = false, message }: ChatMessageItemProps) {
  if (message.kind === 'moderation') {
    return (
      <li className="flex items-start gap-2.5 rounded-12 border border-gold/35 bg-gold/8 px-3 py-2.5 text-12 leading-normal font-medium text-gold-300">
        <ShieldAlert aria-hidden className="size-4.5 shrink-0" />
        {compact ? (message.short ?? message.text) : message.text}
      </li>
    )
  }

  const mine = message.kind === 'file' || message.mine
  return (
    <li className={classNames('flex max-w-4/5 flex-col gap-1', mine && 'items-end self-end')}>
      <p className={classNames('text-11 font-semibold text-navy-200', compact && 'sr-only')}>
        {mine ? 'Вы' : author} · {message.time}
      </p>
      {message.kind === 'file' ? (
        <div className="flex items-center gap-2.5 rounded-14 rounded-tr-4 border border-emerald/40 bg-emerald/18 px-3 py-2.5">
          <FileText aria-hidden className="size-5 shrink-0 text-emerald-300" />
          <div className="flex flex-col">
            <span className="text-13 font-semibold">{message.name}</span>
            <span className="text-11 font-medium text-navy-200">{message.size}</span>
          </div>
        </div>
      ) : (
        <p
          className={classNames(
            'rounded-14 px-3 py-2.5 text-14 leading-snug font-medium break-words',
            mine ? 'rounded-tr-4 border border-emerald/40 bg-emerald/18' : 'rounded-tl-4 bg-navy-800',
          )}
        >
          {message.text}
          {message.link !== undefined && (
            <a
              className="rounded-4 text-emerald-300 underline hover:text-white focus-visible:outline-2 focus-visible:outline-emerald"
              href={`https://${message.link}`}
              rel="noreferrer"
              target="_blank"
            >
              {message.link}
            </a>
          )}
        </p>
      )}
    </li>
  )
}
