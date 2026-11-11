import { Settings } from 'lucide-react'

import { Avatar, Badge, IconButton } from '~/shared/ui'

import { USER } from '../config/profile'
import { PremiumFlag } from './PremiumFlag'

/*
 * Шапка профиля: аватар, имя, подпись и флажок подписки. Размеры из макета: аватар 52/68/80px,
 * имя 21/28/32px. До md шапка лежит на navy-фоне (его рисует страница): светлый текст, одинарное золотое
 * кольцо у аватара, кнопка настроек справа и флажок под подписью. С md кольцо двойное (отступ цвета фона),
 * флажок справа, а на десктопе рядом с ним цель поступления.
 */
export function ProfileHeader() {
  return (
    <header className="flex items-center gap-3 md:gap-4 lg:gap-5">
      <Avatar
        className="size-13 font-serif text-20 font-semibold ring-2 ring-gold max-md:bg-navy-800 md:size-17 md:text-24 md:ring-offset-3 md:ring-offset-background lg:size-20 lg:text-28"
        initials={USER.initials}
      />
      <div className="flex min-w-0 flex-1 flex-col md:gap-1 lg:gap-1.5">
        <h1 className="font-serif text-21 font-semibold md:text-28 md:text-heading lg:text-32">{USER.name}</h1>
        <p className="text-12 font-medium text-navy-200 md:text-14 md:text-muted">
          <span className="md:hidden">{USER.subtitle.mobile}</span>
          <span className="max-md:hidden lg:hidden">{USER.subtitle.tablet}</span>
          <span className="max-lg:hidden">{USER.subtitle.desktop}</span>
        </p>
        <PremiumFlag className="mt-2 md:hidden" onNavy />
      </div>
      <div className="flex items-center gap-2.5 max-md:hidden">
        <PremiumFlag />
        <Badge className="px-3.5 py-2 font-bold max-lg:hidden" pill size="lg" tone="outline">
          {USER.target}
        </Badge>
      </div>
      <IconButton
        aria-label="Настройки"
        className="self-start border-transparent bg-transparent text-navy-200 hover:bg-white/10 hover:text-white md:hidden"
        icon={Settings}
      />
    </header>
  )
}
