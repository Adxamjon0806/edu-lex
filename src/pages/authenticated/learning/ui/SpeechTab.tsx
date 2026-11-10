import { useState } from 'react'

import { Mic } from 'lucide-react'

import { classNames } from '~/shared/lib'
import { Badge, Card } from '~/shared/ui'

import { LAST_ATTEMPT, WAVE_HEIGHTS, WAVE_MOBILE_COUNT } from '../config/learning'
import type { Term } from '../model/types'

/*
 * Режим «Речь»: термин, волна записи и кнопка микрофона. Пока это сухая вёрстка: кнопка только
 * переключает вид записи (как в макете), микрофон не используется.
 * Размеры из макета: термин 40/56/64px, кнопка 84px до md и 96px с md; до md в волне 22 полоски из 32.
 * Метка последней попытки в макете есть только на десктопе.
 */
export function SpeechTab({ term }: Readonly<{ term: Term }>) {
  const [recording, setRecording] = useState(false)

  return (
    <Card className="flex flex-col items-center gap-4 rounded-22 px-4 py-8 md:gap-5 md:rounded-24 md:px-8 md:py-12 lg:gap-5.5 lg:p-14">
      <p className="text-13 font-semibold text-muted md:text-14">Произнесите термин</p>
      <h2 className="text-center font-serif text-40 leading-none font-semibold text-body md:text-56 lg:text-64">
        {term.en}
      </h2>
      <p className="text-15 font-medium text-muted md:text-17 lg:text-18">
        {term.ipa}
        <span className="max-lg:hidden"> · {term.ru}</span>
      </p>
      <SpeechWave recording={recording} />
      <button
        aria-label="Записать произношение"
        aria-pressed={recording}
        className={classNames(
          'flex size-21 cursor-pointer items-center justify-center rounded-full text-white ring-12 transition-all md:size-24',
          'focus-visible:outline-2 focus-visible:outline-offset-14 focus-visible:outline-emerald active:translate-y-px',
          recording
            ? 'bg-red-700 ring-red-700/15 hover:bg-red'
            : 'bg-emerald shadow-glow-lg ring-emerald/12 hover:bg-emerald-700',
        )}
        onClick={() => {
          setRecording((value) => !value)
        }}
        type="button"
      >
        <Mic aria-hidden className="size-8 md:size-9" />
      </button>
      <p aria-live="polite" className="text-center text-14 font-semibold text-body md:text-15">
        {recording ? 'Идёт запись… нажмите, чтобы остановить' : 'Нажмите и произнесите термин'}
      </p>
      <Badge className="px-4 py-2 text-14 font-bold max-lg:hidden" pill size="lg" tone="success">
        {LAST_ATTEMPT}
      </Badge>
    </Card>
  )
}

function getIdleBarClassName(index: number) {
  return index % 3 === 0 ? 'bg-inactive' : 'bg-line-strong'
}

/*
 * Волна записи, только для вида (скрыта от скринридера). Во время записи полоски в полную высоту и emerald,
 * в покое — низкие (30% высоты, не ниже 8px) и серые: каждая третья темнее.
 */
function SpeechWave({ recording }: Readonly<{ recording: boolean }>) {
  return (
    <div aria-hidden className="flex h-16 items-center gap-1 md:h-20 md:gap-1.25">
      {WAVE_HEIGHTS.map((height, index) => (
        <span
          className={classNames(
            'w-1.25 rounded-3 transition-all duration-300 md:w-1.5',
            index >= WAVE_MOBILE_COUNT && 'max-md:hidden',
            recording ? 'bg-emerald' : getIdleBarClassName(index),
          )}
          // Полоски волны неизменны и не переставляются, поэтому индекс — надёжный ключ.
          // eslint-disable-next-line react-x/no-array-index-key
          key={index}
          style={{ height: `${String(recording ? height : Math.max(8, height * 0.3))}px` }}
        />
      ))}
    </div>
  )
}
