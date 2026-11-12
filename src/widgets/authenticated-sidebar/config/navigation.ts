import type { LinkProps } from '@tanstack/react-router'
import {
  BadgeCheck,
  BookOpen,
  CalendarDays,
  House,
  LayoutDashboard,
  SlidersHorizontal,
  Target,
  UserRound,
  Users,
  Video,
  Wallet,
  type LucideIcon,
} from 'lucide-react'

import type { UserRole } from '~/entities/session'

export type NavigationItem = Readonly<{
  icon: LucideIcon
  /** Уникальный ключ пункта. Пока у пункта нет своей страницы, он же — hash ссылки на главную (см. AuthenticatedSidebar). */
  key: string
  label: string
  /** Подпись для узкой колонки и нижней панели, где полная не помещается. */
  shortLabel: string
  /** Страница пункта. Без неё пункт ведёт на главную. */
  to?: LinkProps['to']
}>

/*
 * Пункты навигации по ролям. Подписи и иконки — из навигации макета (nav, navS и navTeach),
 * «Консультация» — по решению проекта, её короткая подпись «Консульт.» не из макета: полная не помещается в 64px.
 */
export const NAVIGATION_ITEMS: Readonly<Record<UserRole, readonly NavigationItem[]>> = {
  student: [
    { icon: House, key: 'dashboard', label: 'Главная', shortLabel: 'Главная' },
    { icon: BookOpen, key: 'learning', label: 'Обучение', shortLabel: 'Обучение', to: '/learning' },
    { icon: Target, key: 'practice', label: 'Практика', shortLabel: 'Практика', to: '/practice' },
    { icon: UserRound, key: 'profile', label: 'Профиль', shortLabel: 'Профиль', to: '/profile' },
    { icon: Users, key: 'mentors', label: 'Менторы', shortLabel: 'Менторы', to: '/mentors' },
    { icon: Video, key: 'consultation', label: 'Консультация', shortLabel: 'Консульт.', to: '/consultation' },
  ],
  teacher: [
    { icon: LayoutDashboard, key: 'overview', label: 'Обзор', shortLabel: 'Обзор' },
    { icon: CalendarDays, key: 'schedule', label: 'Расписание', shortLabel: 'Расписание' },
    { icon: SlidersHorizontal, key: 'services', label: 'Услуги', shortLabel: 'Услуги' },
    { icon: Wallet, key: 'finance', label: 'Финансы', shortLabel: 'Финансы' },
    { icon: BadgeCheck, key: 'profile', label: 'Профиль', shortLabel: 'Профиль' },
  ],
}
