import { BOOKING_TEXTS, CALENDAR } from '../config/mentor'

// Дни недели с воскресенья: 1 ноября 2026 — воскресенье, поэтому день d — это (d - 1) % 7.
const WEEKDAYS_SHORT = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'] as const
const WEEKDAYS_FULL = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'] as const

// Подпись дня для скринридера, например «четверг, 5 ноября».
export function getDayLabel(day: number) {
  return `${WEEKDAYS_FULL[(day - 1) % 7]}, ${String(day)} ${CALENDAR.monthGenitive}`
}

// Выбранные дата и время, например «Чт, 5 ноября · 10:30» или «Чт, 5 ноября · время не выбрано».
export function getWhenLabel(day: number, slot: null | string) {
  return `${WEEKDAYS_SHORT[(day - 1) % 7]}, ${String(day)} ${CALENDAR.monthGenitive} · ${slot ?? BOOKING_TEXTS.noTime}`
}

// Недоступный день: формула прототипа — воскресенья и 9, 18, 27 число. Уйдёт с расписанием с сервера.
export function isDayOff(day: number) {
  return (day + 6) % 7 === 0 || day % 9 === 0
}
