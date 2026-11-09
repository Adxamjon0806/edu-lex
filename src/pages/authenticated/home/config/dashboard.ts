import type { DirectionKey } from '~/entities/direction'

import type { ActiveCourse } from '../model/types'

// Моковые данные главной студента из экрана «02 Dashboard» бандла. Заменятся данными с сервера.

export const STUDENT = {
  firstName: 'Азиз',
  goal: "Цель: LLM · King's College London · сентябрь 2027",
  initials: 'АК',
} as const

export const STATS = {
  streakDays: 14,
  terms: 1248,
} as const

export const ACTIVE_COURSE: ActiveCourse = {
  modulesDone: 4,
  modulesTotal: 8,
  moduleTitle: 'Contract Formation',
  progress: 58,
  termsLeft: 18,
  title: 'Corporate Law: Foundations',
}

export const TRACK_PROGRESS: Readonly<Record<DirectionKey, number>> = {
  biz: 22,
  it: 0,
  law: 58,
  med: 0,
}

export const TRACK_META = '8 модулей · 320 терминов'

export const DAILY_LESSON = {
  area: 'Реальный кейс · Contract Law',
  caseName: 'Carlill v Carbolic Smoke Ball Co',
  duration: 'Мини-урок дня · 5 мин',
  // Описание в макете сокращается с шириной экрана.
  summary: {
    desktop:
      'Почему рекламное объявление стало обязательной офертой? Разберём ключевые термины английского договорного права на одном из самых цитируемых прецедентов.',
    mobile: 'Почему реклама стала обязательной офертой?',
    tablet: 'Почему рекламное объявление стало обязательной офертой? Разбор ключевых терминов договорного права.',
  },
  terms: ['offer', 'acceptance', 'unilateral contract', 'consideration'],
  year: 1893,
} as const

export const DAILY_GOAL = {
  done: 22,
  total: 30,
} as const
