import type { Certificate, Skill } from '../model/types'

// Моковые данные экрана «05 Profile & Readiness» бандла. Заменятся данными с сервера.

export const USER = {
  initials: 'АК',
  name: 'Азиз Каримов',
  // Подпись под именем в макете сокращается с шириной экрана.
  subtitle: {
    desktop: 'Студент · Право и публичная политика · Ташкент · English C1',
    mobile: 'Право · English C1',
    tablet: 'Право и публичная политика · English C1',
  },
  target: "Цель: King's College London",
} as const

// Флажок подписки в шапке. Позже он будет показываться, только пока подписка не оформлена.
export const PREMIUM_FLAG = 'Premium · годовой'

export const READINESS = {
  delta: '+6 за месяц',
  // Подсказка под полосами на десктопе.
  hint: 'До порога 85% для подачи в KCL — завершите модуль «International Public Law» и 2 ситуационных теста.',
  // Тексты navy-блока на планшете и мобильном.
  summary: 'Порог 85% — осталось 1 модуль и 2 кейс-теста.',
  title: {
    mobile: 'Готовность к поступлению в KCL',
    tablet: "Готовность к поступлению в King's College London",
  },
  value: 72,
} as const

export const READINESS_PARTS: readonly Skill[] = [
  { label: 'Академическая лексика', value: 82 },
  { label: 'Кейсы и чтение', value: 76 },
  { label: 'Устная речь', value: 55 },
  { label: 'Сертификаты', value: 67 },
]

// Оси радара навыков по часовой стрелке, начиная сверху.
export const SKILLS: readonly Skill[] = [
  { label: 'Лексика', value: 82 },
  { label: 'Чтение', value: 74 },
  { label: 'Аудирование', value: 68 },
  { label: 'Речь', value: 55 },
  { label: 'Письмо', value: 61 },
  { label: 'Кейсы', value: 77 },
]

export const CERTIFICATES: readonly Certificate[] = [
  {
    issued: true,
    meta: 'Право · 36 ч · 120 терминов',
    short: '36 ч · 120 терминов',
    status: 'Выдан 12.09.2026 · ID EL-4821-CL',
    title: 'Corporate Law',
  },
  {
    issued: true,
    meta: 'Право · 24 ч · 90 терминов',
    short: '24 ч · 90 терминов',
    status: 'Выдан 03.06.2026 · ID EL-3170-LE',
    title: 'Legal English Foundations',
  },
  {
    issued: false,
    meta: 'В процессе · 64% · итоговый тест впереди',
    short: 'В процессе · 64%',
    status: 'Будет выдан после итогового теста',
    title: 'International Public Law',
  },
]
