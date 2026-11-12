import { MessageSquare, Mic, MicOff, PhoneOff, ScreenShare, Video, VideoOff, type LucideIcon } from 'lucide-react'

import { classNames } from '~/shared/lib'

type CallControlsProps = Readonly<{
  cameraOn: boolean
  chatOpen: boolean
  micOn: boolean
  onEnd: () => void
  onToggleCamera: () => void
  onToggleChat: () => void
  onToggleMic: () => void
  onToggleShare: () => void
  sharing: boolean
}>

/*
 * Управление звонком: переключатели (aria-pressed) и «Завершить». Вид из макета:
 * - включённые микрофон и камера — полупрозрачные, выключенные — белые с тёмной иконкой;
 * - демонстрация экрана включена — emerald, открытый чат — светлее;
 * - «Завершить» на десктопе с подписью, ниже — круглая; кнопки 56px, на планшете 60px;
 * - до md панель на всю ширину внизу экрана с размытым фоном.
 * Hover в макете не нарисован: фон становится плотнее.
 */
export function CallControls({
  cameraOn,
  chatOpen,
  micOn,
  onEnd,
  onToggleCamera,
  onToggleChat,
  onToggleMic,
  onToggleShare,
  sharing,
}: CallControlsProps) {
  return (
    <div className="flex justify-between gap-3 max-md:bg-navy-950/55 max-md:px-4 max-md:pt-3.5 max-md:pb-7.5 max-md:backdrop-blur-md md:justify-center">
      <ControlButton
        icon={micOn ? Mic : MicOff}
        label="Микрофон"
        onClick={onToggleMic}
        pressed={micOn}
        tone={micOn ? 'default' : 'off'}
      />
      <ControlButton
        icon={cameraOn ? Video : VideoOff}
        label="Камера"
        onClick={onToggleCamera}
        pressed={cameraOn}
        tone={cameraOn ? 'default' : 'off'}
      />
      <ControlButton
        icon={ScreenShare}
        label="Демонстрация экрана"
        onClick={onToggleShare}
        pressed={sharing}
        tone={sharing ? 'active' : 'default'}
      />
      <ControlButton
        icon={MessageSquare}
        label="Чат"
        onClick={onToggleChat}
        pressed={chatOpen}
        tone={chatOpen ? 'open' : 'default'}
      />
      <button
        className={classNames(
          'flex size-14 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-red text-15 font-bold text-white transition-colors hover:bg-red-700 md:size-15',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald',
          'lg:h-14 lg:w-auto lg:px-6.5',
        )}
        onClick={onEnd}
        type="button"
      >
        <PhoneOff aria-hidden className="size-5.5 lg:size-5" />
        <span className="max-lg:sr-only">Завершить</span>
      </button>
    </div>
  )
}

const toneClasses = {
  active: 'bg-emerald/90 text-white hover:bg-emerald',
  default: 'bg-white/10 text-white hover:bg-white/16',
  off: 'bg-white/92 text-navy hover:bg-white',
  open: 'bg-white/22 text-white hover:bg-white/28',
} as const

type ControlButtonProps = Readonly<{
  icon: LucideIcon
  label: string
  onClick: () => void
  pressed: boolean
  tone: keyof typeof toneClasses
}>

function ControlButton({ icon: Icon, label, onClick, pressed, tone }: ControlButtonProps) {
  return (
    <button
      aria-label={label}
      aria-pressed={pressed}
      className={classNames(
        'flex size-14 shrink-0 cursor-pointer items-center justify-center rounded-full backdrop-blur-sm transition-colors md:size-15 lg:size-14',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald',
        toneClasses[tone],
      )}
      onClick={onClick}
      type="button"
    >
      <Icon aria-hidden className="size-5.5" />
    </button>
  )
}
