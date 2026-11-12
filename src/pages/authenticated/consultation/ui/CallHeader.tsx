import { ShieldCheck } from 'lucide-react'

import type { Mentor } from '~/entities/mentor'

import { SESSION } from '../config/consultation'
import { CallTimer } from './CallTimer'

type CallHeaderProps = Readonly<{
  mentor: Mentor
  running: boolean
}>

/*
 * Шапка звонка и таймер. Вид из макета:
 * - до md — имя ментора и «Contract Law · эскроу $35»;
 * - md–lg — тема и «имя · ментор»;
 * - от lg — знак EduLex, тема и «Защищённое соединение · средства в эскроу».
 * Заголовок страницы — тема сессии (до md он для скринридера, на экране — имя ментора).
 */
export function CallHeader({ mentor, running }: CallHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4 max-md:px-5 max-md:py-3.5">
      <div className="flex min-w-0 items-center gap-3">
        <img alt="" className="h-8.25 w-7.5 shrink-0 object-cover max-lg:hidden" src="/edulex-mark.png" />
        <div className="flex min-w-0 flex-col">
          <h1 className="font-serif text-16 font-semibold md:text-18 lg:text-17">
            <span className="max-md:sr-only">{SESSION.topic}</span>
            <span aria-hidden className="md:hidden">
              {mentor.name}
            </span>
          </h1>
          <p className="flex items-center gap-1.5 text-11 font-medium text-navy-200 md:text-12">
            <span className="md:hidden">
              {SESSION.topicShort} · эскроу ${mentor.price}
            </span>
            <span className="max-md:hidden lg:hidden">
              {mentor.name} · {SESSION.role}
            </span>
            <ShieldCheck aria-hidden className="size-3.5 shrink-0 text-emerald-500 max-lg:hidden" />
            <span className="max-lg:hidden">{SESSION.secure}</span>
          </p>
        </div>
      </div>
      <CallTimer running={running} />
    </header>
  )
}
