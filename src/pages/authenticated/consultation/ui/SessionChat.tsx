import { useState } from 'react'

import { Paperclip, Send } from 'lucide-react'

import { classNames } from '~/shared/lib'
import { IconButton } from '~/shared/ui'

import { CHAT_TITLE } from '../config/consultation'
import type { ChatMessage } from '../model/types'
import { ChatMessageItem } from './ChatMessageItem'

type SessionChatProps = Readonly<{
  author: string
  className?: string
  messages: readonly ChatMessage[]
  onSend: (text: string) => void
  /** Вид из макета: desktop — панель 360px справа; tablet — карточка под видео с частью сообщений. */
  variant: 'desktop' | 'tablet'
}>

/*
 * Чат сессии. Пока локальный: отправленное сообщение добавляется в конец, пустое не отправляется.
 * Новые сообщения скринридер объявляет (role="log"). Скрепка пока ничего не делает.
 */
export function SessionChat({ author, className, messages, onSend, variant }: SessionChatProps) {
  const [draft, setDraft] = useState('')
  const isDesktop = variant === 'desktop'
  const visible = isDesktop ? messages : messages.filter((message) => message.tablet === true)

  return (
    <section
      aria-label={CHAT_TITLE}
      className={classNames(
        'flex flex-col bg-navy-900',
        isDesktop ? 'w-90 border-l border-navy-700' : 'gap-2.5 rounded-16 border border-navy-700 p-4',
        className,
      )}
    >
      {isDesktop && (
        <div className="flex items-center justify-between border-b border-navy-700 py-3.5 pr-3.5 pl-5">
          <h2 className="font-serif text-18 font-semibold">{CHAT_TITLE}</h2>
          <IconButton
            aria-label="Прикрепить файл"
            className="border-transparent bg-transparent text-navy-200 hover:bg-white/10 hover:text-white"
            icon={Paperclip}
            size={40}
          />
        </div>
      )}
      <ol
        className={classNames(
          'flex flex-col overflow-y-auto',
          isDesktop ? 'min-h-0 flex-1 gap-3.5 p-5' : 'max-h-50 gap-2.5',
        )}
        role="log"
      >
        {visible.map((message) => (
          <ChatMessageItem author={author} compact={!isDesktop} key={message.id} message={message} />
        ))}
      </ol>
      <form
        className={classNames('flex gap-2', isDesktop && 'border-t border-navy-700 p-4')}
        onSubmit={(event) => {
          event.preventDefault()
          const text = draft.trim()
          if (text === '') return
          onSend(text)
          setDraft('')
        }}
      >
        <label className="sr-only" htmlFor={`chat-input-${variant}`}>
          Сообщение
        </label>
        <input
          className="min-w-0 flex-1 rounded-12 border border-transparent bg-navy-800 px-3.5 py-3 text-14 font-medium text-white outline-none placeholder:text-navy-300 focus:border-emerald"
          id={`chat-input-${variant}`}
          onChange={(event) => {
            setDraft(event.target.value)
          }}
          placeholder="Сообщение…"
          value={draft}
        />
        <button
          aria-label="Отправить"
          className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-12 bg-emerald text-white transition-colors hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
          type="submit"
        >
          <Send aria-hidden className="size-4.5" />
        </button>
      </form>
    </section>
  )
}
