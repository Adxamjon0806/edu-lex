import { Crown } from 'lucide-react'

// Карточка «EduLex Premium» внизу боковой панели. В макете она только на широком экране.
export function PremiumPromo() {
  return (
    <aside className="flex flex-col gap-2.5 rounded-14 border border-gold bg-gold/8 p-4.5">
      <Crown aria-hidden className="size-5 text-gold-400" />
      <span className="font-serif text-18 font-semibold text-white">EduLex Premium</span>
      <span className="text-13 leading-normal font-medium text-navy-200">Все модули и офлайн-режим</span>
    </aside>
  )
}
