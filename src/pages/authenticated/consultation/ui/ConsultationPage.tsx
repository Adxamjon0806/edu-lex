import { useState } from 'react'

import { getMentor, MENTORS } from '~/entities/mentor'

import { CHAT_MESSAGES, CHAT_PREVIEW, SESSION_MENTOR_ID } from '../config/consultation'
import { formatMessageTime } from '../lib/format'
import type { ChatMessage } from '../model/types'
import { CallControls } from './CallControls'
import { CallHeader } from './CallHeader'
import { SessionChat } from './SessionChat'
import { SessionEndedDialog } from './SessionEndedDialog'
import { VideoStage } from './VideoStage'

/*
 * Видеоконсультация (экран «09 Видеоконсультация»): шапка с таймером, видео, управление, чат и завершение.
 * Экран на всю страницу без навигации (staticData.immersive маршрута) и тёмный в обеих темах: цвета только
 * из палитры navy, emerald, gold и red. Пока это вёрстка на локальном состоянии: камеры, микрофона
 * и сервера нет, сообщения и оценка никуда не отправляются.
 * Раскладка из макета: с lg чат — колонка справа; на планшете — карточка между видео и управлением;
 * до md — превью сообщений над панелью управления, подсветка в центре — у всего экрана.
 */
export function ConsultationPage() {
  const mentor = getMentor(SESSION_MENTOR_ID) ?? MENTORS[0]
  const authorName = mentor.name.split(' ')[0]
  const [micOn, setMicOn] = useState(true)
  const [cameraOn, setCameraOn] = useState(true)
  const [sharing, setSharing] = useState(false)
  const [chatOpen, setChatOpen] = useState(true)
  const [ended, setEnded] = useState(false)
  const [messages, setMessages] = useState<readonly ChatMessage[]>(CHAT_MESSAGES)

  function send(text: string) {
    setMessages((previous) => [
      ...previous,
      {
        id: `sent-${String(previous.length)}`,
        kind: 'text',
        mine: true,
        tablet: true,
        text,
        time: formatMessageTime(new Date()),
      },
    ])
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-navy-950 text-white max-md:bg-radial-[at_50%_35%] max-md:from-navy-800 max-md:to-navy-950 max-md:to-75% lg:grid lg:grid-cols-[1fr_auto]">
      <div className="flex min-h-0 flex-1 flex-col md:gap-4 md:p-6 lg:p-5">
        <CallHeader mentor={mentor} running={!ended} />
        <VideoStage cameraOn={cameraOn} mentor={mentor} micOn={micOn} sharing={sharing} />
        {chatOpen && (
          <>
            <SessionChat
              author={authorName}
              className="max-md:hidden lg:hidden"
              messages={messages}
              onSend={send}
              variant="tablet"
            />
            <ul className="mx-4 mb-3 flex flex-col gap-2 md:hidden">
              <li className="self-start rounded-14 rounded-tl-4 bg-navy-800/85 px-3 py-2.25 text-13 font-medium">
                {CHAT_PREVIEW.message}
              </li>
              <li className="self-start rounded-12 border border-gold/35 bg-gold/12 px-2.5 py-2 text-11 font-medium text-gold-300">
                {CHAT_PREVIEW.moderation}
              </li>
            </ul>
          </>
        )}
        <CallControls
          cameraOn={cameraOn}
          chatOpen={chatOpen}
          micOn={micOn}
          onEnd={() => {
            setEnded(true)
          }}
          onToggleCamera={() => {
            setCameraOn((on) => !on)
          }}
          onToggleChat={() => {
            setChatOpen((open) => !open)
          }}
          onToggleMic={() => {
            setMicOn((on) => !on)
          }}
          onToggleShare={() => {
            setSharing((on) => !on)
          }}
          sharing={sharing}
        />
      </div>
      {chatOpen && (
        <SessionChat
          author={authorName}
          className="max-lg:hidden"
          messages={messages}
          onSend={send}
          variant="desktop"
        />
      )}
      <SessionEndedDialog
        onReturn={() => {
          setEnded(false)
        }}
        open={ended}
        price={mentor.price}
      />
    </div>
  )
}
