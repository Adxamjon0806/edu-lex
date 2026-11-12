import { useEffect, useState } from 'react'

import { Timer } from 'lucide-react'

import { SESSION } from '../config/consultation'
import { formatRemaining } from '../lib/format'

/*
 * Оставшееся время сессии: обратный отсчёт раз в секунду до нуля, на паузе — пока сессия завершена.
 * role="timer" не объявляет каждую секунду скринридеру. Вид из макета: на десктопе с рамкой и «осталось».
 */
export function CallTimer({ running }: Readonly<{ running: boolean }>) {
  const [remaining, setRemaining] = useState<number>(SESSION.remainingSeconds)

  useEffect(() => {
    if (!running) return
    const interval = setInterval(() => {
      setRemaining((seconds) => Math.max(0, seconds - 1))
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [running])

  return (
    <p className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-14 font-bold md:gap-2 md:bg-white/8 md:px-3.5 md:py-2 md:text-15 lg:border lg:border-white/12 lg:px-4 lg:text-16">
      <Timer aria-hidden className="size-4 text-emerald-300 lg:size-4.5" />
      <span className="tabular-nums" role="timer">
        {formatRemaining(remaining)}
      </span>
      <span className="text-12 font-medium text-navy-200 max-lg:sr-only">осталось</span>
    </p>
  )
}
