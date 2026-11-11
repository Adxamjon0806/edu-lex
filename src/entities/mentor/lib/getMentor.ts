import { MENTORS } from '../config/mentors'

// Ментор по id из адреса; undefined — такого нет.
export function getMentor(id: string) {
  return MENTORS.find((mentor) => mentor.id === id)
}

/*
 * Порядковый номер ментора: в прототипе от него зависит занятость слотов, чтобы она отличалась
 * у разных менторов. Уйдёт вместе с моками.
 */
export function getMentorSeed(id: string) {
  return MENTORS.findIndex((mentor) => mentor.id === id)
}
