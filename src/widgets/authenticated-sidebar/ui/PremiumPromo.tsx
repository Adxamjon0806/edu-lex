import { Link } from '@tanstack/react-router'
import { Crown } from 'lucide-react'

/*
 * Карточка «EduLex Premium» внизу боковой панели — ссылка на подписку. В макете она только на широком экране.
 * Hover в макете не нарисован: фон становится чуть ярче.
 */
export function PremiumPromo() {
  return (
    <Link
      className="flex flex-col gap-2.5 rounded-14 border border-gold bg-gold/8 p-4.5 transition-colors hover:bg-gold/14 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
      to="/profile/subscription"
    >
      <Crown aria-hidden className="size-5 text-gold-400" />
      <span className="font-serif text-18 font-semibold text-white">EduLex Premium</span>
      <span className="text-13 leading-normal font-medium text-navy-200">Все модули и офлайн-режим</span>
    </Link>
  )
}
