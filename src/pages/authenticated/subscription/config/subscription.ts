import { Apple, CreditCard, Landmark, Play, Smartphone, Wallet } from 'lucide-react'

import type { PaymentMethod, Plan, PlanKey } from '../model/types'

// Моковые данные экрана «08 Subscription & Payments» бандла (тарифы студента). Заменятся данными с сервера.

export const SUBSCRIPTION_TEXTS = {
  description: 'Полный доступ к академическим модулям, офлайн-режиму и сертификатам готовности к поступлению',
  // Подпись под кнопкой оформления на мобильном.
  mobileNote: 'Оплата через App Store, Google Play, Stripe или Payme / Click. Отмена в любой момент.',
  // Подпись под кнопкой оформления на десктопе.
  secureNote: 'Защищённый платёж · отмена в любой момент · данные пользователей из Узбекистана хранятся в РУз',
  title: 'EduLex Premium',
} as const

export const PLANS: readonly Plan[] = [
  { key: 'month', name: 'Студенческий', note: 'Отмена в любой момент', per: 'в месяц', price: '$9.99' },
  { key: 'semester', name: 'Семестровый', note: '≈ $7.50 / мес · −25%', per: 'за 6 месяцев', price: '$44.99' },
  {
    badge: 'Выгоднее всего',
    key: 'year',
    name: 'Годовой доступ',
    note: '≈ $6.67 / мес · −33%',
    per: 'за 12 месяцев',
    price: '$79.99',
  },
]

export const DEFAULT_PLAN: PlanKey = 'year'

// Иконки — из макета (в нём иконки Lucide).
export const PAYMENT_METHODS: readonly PaymentMethod[] = [
  { icon: Apple, key: 'apple', label: 'Apple App Store' },
  { icon: Play, key: 'google', label: 'Google Play' },
  { icon: CreditCard, key: 'stripe', label: 'Stripe · карта' },
  { icon: Wallet, key: 'payme', label: 'Payme' },
  { icon: Smartphone, key: 'click', label: 'Click' },
  { icon: Landmark, key: 'uzcard', label: 'Uzcard / Humo' },
]

export const DEFAULT_PAYMENT = 'apple'

export const FEATURES: readonly string[] = [
  'Все академические модули и треки',
  'Офлайн-режим',
  'Сертификаты с QR-верификацией',
  'Мини-лекции и разборы кейсов',
]

export const REFERRAL = {
  code: 'AZIZ-7K2',
  // Описание в макете сокращается на планшете.
  description: {
    desktop: '+7 дней Premium за каждого друга, который пройдёт первый модуль',
    tablet: '+7 дней Premium за каждого друга',
  },
  title: 'Приведи друга',
} as const
