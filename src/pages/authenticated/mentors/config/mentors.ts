import type { MentorSubject } from '~/entities/mentor'

import type { ChipGroupOption } from '~/shared/ui'

import type { BookingDay } from '../model/types'

// Моковые данные экрана «06 Mentor Marketplace» бандла. Заменятся данными с сервера.

export const MENTORS_TEXTS = {
  // В мобильном макете подсказка короче — «Поиск».
  searchPlaceholder: 'Предмет, вуз или имя',
  subtitle: 'Верифицированные эксперты · оплата хранится в эскроу до завершения сессии',
  title: 'Менторы',
} as const

export const SUBJECT_OPTIONS: readonly ChipGroupOption<MentorSubject>[] = [
  { label: 'Все', value: 'all' },
  { label: 'Право', value: 'law' },
  { label: 'Бизнес', value: 'biz' },
  { label: 'IT', value: 'it' },
  { label: 'Медицина', value: 'med' },
]

export const DEFAULT_SUBJECT: MentorSubject = 'all'

// Фильтры-списки на десктопе. Пока только вид: списки появятся вместе с поиском на сервере.
export const EXTRA_FILTERS = {
  degree: 'Степень: PhD, Master',
  price: '$20 – $60',
  rating: '4.7+',
} as const

export const BOOKING_MONTH = 'НОЯБРЬ 2026'
export const BOOKING_TIMEZONE = 'Ташкент, GMT+5'
// Месяц в подписи выбранного времени: «Вт, 3 нояб · 10:30».
export const BOOKING_MONTH_SHORT = 'нояб'

export const BOOKING_DAYS: readonly BookingDay[] = [
  { date: '2', weekday: 'Пн' },
  { date: '3', weekday: 'Вт' },
  { date: '4', weekday: 'Ср' },
  { date: '5', weekday: 'Чт' },
  { date: '6', weekday: 'Пт' },
  { date: '7', weekday: 'Сб' },
  { date: '8', weekday: 'Вс' },
]

// День по умолчанию из состояния прототипа: вторник.
export const DEFAULT_DAY = 1

export const BOOKING_TEXTS = {
  booked: 'Забронировано',
  bookedEscrow: 'заморожены в эскроу и поступят ментору после звонка. Бесплатная отмена за 24 ч.',
  bookedShort: 'средства в эскроу до завершения звонка',
  bookedTitle: 'Сессия забронирована',
  documentsTitle: 'ПОДТВЕРЖДЁННЫЕ ДОКУМЕНТЫ',
  documentVerified: 'Подлинность проверена EduLex · 14.03.2026',
  pay: 'Оплатить и забронировать',
  pickTime: 'Выберите время',
  secureDeal: 'Безопасная сделка: средства будут удержаны до завершения сессии',
  sessionLength: '/ 50 мин',
} as const
