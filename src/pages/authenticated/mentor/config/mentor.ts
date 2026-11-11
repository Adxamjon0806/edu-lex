import { Apple, CreditCard, Smartphone, Wallet, type LucideIcon } from 'lucide-react'

// Тексты и моки экрана «10 Карточка ментора» бандла. Заменятся данными с сервера.

export const MENTOR_TEXTS = {
  about: 'О менторе',
  back: 'Все менторы',
  credentials: 'Дипломы и сертификаты',
  credentialsHint: 'Нажмите, чтобы просмотреть',
  documentRegistry: 'Оригинал сверен с реестром выдавшей организации',
  // Подтверждение документа: на карточке документа, в превью (десктоп, планшет) и на мобильном.
  documentVerified: 'Подтверждено EduLex',
  documentVerifiedFull: 'Подлинность проверена EduLex · 14.03.2026',
  documentVerifiedMobile: 'Подлинность проверена',
  documentVerifiedTablet: 'Подлинность проверена EduLex',
  perSession: 'за 50 минут',
  reviews: 'Отзывы',
} as const

// Экран, если ментора с таким id нет. В макете его нет: тексты выведены по смыслу.
export const NOT_FOUND_TEXTS = {
  description: 'Возможно, профиль скрыт или ссылка устарела.',
  title: 'Ментор не найден',
} as const

export const CALENDAR = {
  // 1 ноября 2026 — воскресенье: перед ним в сетке с понедельника 6 пустых клеток.
  days: 30,
  leadingBlanks: 6,
  monthGenitive: 'ноября',
  title: 'Ноябрь 2026',
  weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
} as const

// День по умолчанию из состояния прототипа.
export const DEFAULT_DAY = 5

export const BOOKING_TEXTS = {
  booked: 'Оплачено',
  bookedButton: 'Оплачено · сессия в расписании',
  bookedEscrow: 'заморожены в эскроу и поступят ментору после звонка.',
  bookedShort: 'средства в эскроу до завершения звонка',
  cancelPolicy: 'Отмена ≥ 24 ч — 100% возврат · 2–24 ч — 50% · менее 2 ч — без возврата',
  duration: '50 мин · видеозвонок',
  noTime: 'время не выбрано',
  pay: 'Оплатить',
  pickTime: 'Выберите время',
  secureDeal: 'Безопасная сделка: средства удерживаются до завершения сессии',
  slots: 'СВОБОДНОЕ ВРЕМЯ',
  slotsZone: 'GMT+5',
  summaryDuration: 'Длительность',
  summaryTotal: 'Итого',
  summaryWhen: 'Дата и время',
} as const

export const PAYMENT_OPTIONS: readonly Readonly<{ icon: LucideIcon; key: string; label: string }>[] = [
  { icon: CreditCard, key: 'stripe', label: 'Карта · Stripe' },
  { icon: Apple, key: 'apple', label: 'Apple Pay' },
  { icon: Wallet, key: 'payme', label: 'Payme' },
  { icon: Smartphone, key: 'click', label: 'Click' },
]

export const DEFAULT_PAYMENT = 'stripe'
