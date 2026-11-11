import type { Mentor, MentorSubject } from '~/entities/mentor'

import { BOOKING_DAYS, BOOKING_MONTH_SHORT } from '../config/mentors'

/*
 * Менторы по направлению и строке поиска. Поиск простой и локальный: без учёта регистра по имени,
 * степени и вузу, направлению и тегам. Заменится поиском на сервере.
 */
export function filterMentors(mentors: readonly Mentor[], subject: MentorSubject, query: string) {
  const needle = query.trim().toLowerCase()
  return mentors.filter(
    (mentor) =>
      (subject === 'all' || mentor.subject === subject) &&
      (needle === '' ||
        [mentor.name, mentor.degree, mentor.subjectLabel, ...mentor.tags].some((text) =>
          text.toLowerCase().includes(needle),
        )),
  )
}

// Подпись выбранного времени, например «Вт, 3 нояб · 10:30».
export function getSlotLabel(dayIndex: number, slot: string) {
  const { date, weekday } = BOOKING_DAYS[dayIndex]
  return `${weekday}, ${date} ${BOOKING_MONTH_SHORT} · ${slot}`
}
