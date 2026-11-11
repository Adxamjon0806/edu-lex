/*
 * Занят ли слот: формула прототипа, чтобы занятость менялась от ментора (seed) и дня.
 * Делитель у экранов разный: в поиске менторов занят каждый третий слот, в карточке — каждый четвёртый.
 * Уйдёт, когда расписание придёт с сервера.
 */
export function isSlotTaken({
  day,
  every,
  seed,
  slotIndex,
}: Readonly<{ day: number; every: number; seed: number; slotIndex: number }>) {
  return (day + slotIndex + seed) % every === 0
}
