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
  /** Уникальный ключ пункта. Пока страниц нет, он же — hash ссылки (см. AuthenticatedSidebar). */
  key: string
  label: string
  /** Подпись для узкой колонки и нижней панели, где полная не помещается. */
  shortLabel: string
}>

/*
 * Пункты навигации по ролям. Подписи и иконки — из навигации макета (nav, navS и navTeach),
 * «Консультация» — по решению проекта, её короткая подпись «Консульт.» не из макета: полная не помещается в 64px.
 */
export const NAVIGATION_ITEMS: Readonly<Record<UserRole, readonly NavigationItem[]>> = {
  student: [
    { icon: House, key: 'dashboard', label: 'Главная', shortLabel: 'Главная' },
    { icon: BookOpen, key: 'learning', label: 'Обучение', shortLabel: 'Обучение' },
    { icon: Target, key: 'practice', label: 'Практика', shortLabel: 'Практика' },
    { icon: UserRound, key: 'profile', label: 'Профиль', shortLabel: 'Профиль' },
    { icon: Users, key: 'mentors', label: 'Менторы', shortLabel: 'Менторы' },
    { icon: Video, key: 'consultation', label: 'Консультация', shortLabel: 'Консульт.' },
  ],
  teacher: [
    { icon: LayoutDashboard, key: 'overview', label: 'Обзор', shortLabel: 'Обзор' },
    { icon: CalendarDays, key: 'schedule', label: 'Расписание', shortLabel: 'Расписание' },
    { icon: SlidersHorizontal, key: 'services', label: 'Услуги', shortLabel: 'Услуги' },
    { icon: Wallet, key: 'finance', label: 'Финансы', shortLabel: 'Финансы' },
    { icon: BadgeCheck, key: 'profile', label: 'Профиль', shortLabel: 'Профиль' },
  ],
}
