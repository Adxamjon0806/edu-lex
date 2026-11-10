import { Link } from '@tanstack/react-router'
import { Crown } from 'lucide-react'

import { classNames } from '~/shared/lib'
import { Badge } from '~/shared/ui'

import { PREMIUM_FLAG } from '../config/profile'

/*
 * Флажок «Premium · годовой» — ссылка на подписку. Вид из макета (десктоп): светлая золотая метка.
 * На navy-шапке мобильного (в макете флажка там нет) — золотая метка для тёмного фона.
 * Hover в макете не нарисован: фон метки становится насыщеннее.
 */
export function PremiumFlag({ className, onNavy = false }: Readonly<{ className?: string; onNavy?: boolean }>) {
  return (
    <Link
      className={classNames(
        'group w-fit rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald',
        className,
      )}
      to="/profile/subscription"
    >
      <Badge
        className={classNames(
          'font-bold transition-colors',
          onNavy ? 'px-3 py-1.25 text-12 group-hover:bg-gold/28' : 'px-3.5 py-2 group-hover:bg-gold/25',
        )}
        icon={Crown}
        pill
        size="lg"
        tone={onNavy ? 'gold-soft' : 'premium'}
      >
        {PREMIUM_FLAG}
      </Badge>
    </Link>
  )
}
