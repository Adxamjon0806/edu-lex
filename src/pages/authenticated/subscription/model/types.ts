import type { LucideIcon } from 'lucide-react'

export type PaymentMethod = Readonly<{
  icon: LucideIcon
  key: string
  label: string
}>

export type Plan = Readonly<{
  /** Метка над тарифом, например «Выгоднее всего». */
  badge?: string
  key: PlanKey
  name: string
  note: string
  per: string
  price: string
}>

export type PlanKey = 'month' | 'semester' | 'year'
