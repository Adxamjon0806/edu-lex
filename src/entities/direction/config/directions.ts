import { Briefcase, Cpu, Scale, Stethoscope, type LucideIcon } from 'lucide-react'

export type Direction = Readonly<{
  en: string
  icon: LucideIcon
  ru: string
  value: DirectionKey
}>

export type DirectionKey = 'biz' | 'it' | 'law' | 'med'

// Направления подготовки из бандла (dirDefs): их выбирают в онбординге, по ним же строятся профильные треки.
export const DIRECTIONS: readonly Direction[] = [
  { en: 'Law & Public Policy', icon: Scale, ru: 'Право и публичная политика', value: 'law' },
  { en: 'Business & MBA', icon: Briefcase, ru: 'Бизнес и MBA', value: 'biz' },
  { en: 'Computer Science & IT', icon: Cpu, ru: 'Компьютерные науки и IT', value: 'it' },
  { en: 'Medicine & Public Health', icon: Stethoscope, ru: 'Медицина и здравоохранение', value: 'med' },
]
