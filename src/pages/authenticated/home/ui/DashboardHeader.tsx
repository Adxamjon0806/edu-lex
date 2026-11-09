import { BookA, Flame } from 'lucide-react'

import { Avatar, Badge } from '~/shared/ui'

import { STATS, STUDENT } from '../config/dashboard'

// Число терминов с пробелом между разрядами, как в макете: «1 248».
const termsFormatter = new Intl.NumberFormat('ru-RU')

/*
 * Шапка главной: приветствие, счётчики серии и словаря, аватар. Раскладка из макета:
 * - до md — аватар, «Доброе утро» мелко и имя под ним, справа короткие счётчики («14», «1248»);
 * - md–lg — приветствие и аватар в строке, счётчики строкой ниже;
 * - от lg — приветствие с целью слева, счётчики и аватар справа.
 */
export function DashboardHeader() {
  return (
    <header className="grid grid-cols-[auto_1fr_auto] items-center gap-x-2.5 md:grid-cols-[1fr_auto] md:gap-y-6 lg:grid-cols-[1fr_auto_auto] lg:gap-x-3">
      <div className="flex flex-col gap-1 md:col-start-1 md:row-start-1">
        <h1 className="font-serif font-semibold text-heading">
          <span className="block font-sans text-12 font-medium text-muted md:inline md:font-serif md:text-28 md:font-semibold md:text-heading lg:text-32">
            Доброе утро
          </span>
          <span className="max-md:hidden md:text-28 lg:text-32">, </span>
          <span className="text-19 md:text-28 lg:text-32">{STUDENT.firstName}</span>
        </h1>
        <p className="text-14 font-medium text-muted max-lg:hidden">{STUDENT.goal}</p>
      </div>
      <ul
        aria-label="Ваш прогресс"
        className="flex gap-1.5 md:col-span-2 md:row-start-2 md:gap-2.5 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:gap-3"
      >
        <li>
          <Badge icon={Flame} pill size="xl" tone="premium">
            <span>
              {STATS.streakDays}
              <span className="max-md:sr-only"> дней</span>
            </span>
          </Badge>
        </li>
        <li>
          <Badge className="[&_svg]:text-success" icon={BookA} pill size="xl" tone="outline">
            <span>
              <span className="md:hidden">{STATS.terms}</span>
              <span className="max-md:hidden">{termsFormatter.format(STATS.terms)}</span>
              <span className="max-md:sr-only"> терминов</span>
            </span>
          </Badge>
        </li>
      </ul>
      <Avatar
        className="-order-1 md:order-none md:col-start-2 md:row-start-1 md:size-11 md:text-15 lg:col-start-3"
        initials={STUDENT.initials}
        name={STUDENT.firstName}
        size={42}
      />
    </header>
  )
}
