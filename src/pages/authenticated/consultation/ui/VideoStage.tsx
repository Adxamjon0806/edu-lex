import { BadgeCheck, MicOff, VideoOff } from 'lucide-react'

import type { Mentor } from '~/entities/mentor'

import { Avatar } from '~/shared/ui'

import { SESSION } from '../config/consultation'
import { SharedScreen } from './SharedScreen'

type VideoStageProps = Readonly<{
  cameraOn: boolean
  mentor: Mentor
  micOn: boolean
  sharing: boolean
}>

/*
 * Видео: ментор по центру (настоящего видео пока нет — аватар в золотом кольце, как в макете),
 * демонстрация экрана поверх и окно «Вы». Окно «Вы» из макета: 100×140 вверху справа до md,
 * 150×200 на планшете, 240×150 внизу справа на десктопе. С md видео — скруглённая область с подсветкой
 * в центре, до md подсветка — у всего экрана (её рисует страница).
 */
export function VideoStage({ cameraOn, mentor, micOn, sharing }: VideoStageProps) {
  return (
    <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden md:rounded-18 md:bg-radial-[at_50%_40%] md:from-navy-800 md:to-navy-900 md:to-70%">
      <Avatar
        className="size-30 border-2 border-gold font-serif text-40 font-semibold md:size-32.5 md:text-44 lg:size-35 lg:text-48"
        initials={mentor.initials}
      />
      <p className="absolute bottom-4.5 left-4.5 flex items-center gap-1.5 rounded-8 bg-navy-950/60 px-3 py-1.5 text-13 font-semibold max-lg:sr-only">
        <BadgeCheck aria-hidden className="size-4 text-emerald-500" />
        {mentor.name} · {SESSION.role}
      </p>

      {sharing && <SharedScreen />}

      <div className="absolute top-2 right-4 flex h-35 w-25 flex-col items-center justify-center gap-1 rounded-14 border border-white/14 bg-navy-800 md:top-4 md:h-50 md:w-37.5 md:gap-1.5 lg:top-auto lg:right-4.5 lg:bottom-4.5 lg:h-37.5 lg:w-60 lg:gap-2">
        {!cameraOn && <VideoOff aria-hidden className="size-4.5 text-navy-200 md:size-5.5 lg:size-6" />}
        <span aria-hidden className="font-serif text-20 font-semibold text-gold-400 md:text-24 lg:text-26">
          {SESSION.studentInitials}
        </span>
        <p className="flex items-center gap-1 text-11 font-semibold max-lg:sr-only lg:absolute lg:bottom-2 lg:left-2.5">
          Вы
          {!cameraOn && <span className="sr-only">, камера выключена</span>}
          {!micOn && (
            <>
              <MicOff aria-hidden className="size-3.5 text-red-300" />
              <span className="sr-only">, микрофон выключен</span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
