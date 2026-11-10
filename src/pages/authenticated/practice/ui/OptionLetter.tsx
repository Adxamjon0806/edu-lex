/*
 * Буква варианта ответа (A–D). Цвет берётся из состояния карточки Radio (data-state):
 * выбран — тёмная, верный — emerald, неверный — красная, остальные — приглушённая.
 * Радиус 8px: в макете на мобильном 7px, такого шага в шкале нет.
 */
export function OptionLetter({ letter }: Readonly<{ letter: string }>) {
  return (
    <span
      aria-hidden
      className="flex size-7 shrink-0 items-center justify-center rounded-8 bg-surface-muted text-13 font-bold text-body-secondary transition-colors group-data-[state=danger]/radio:bg-red-300 group-data-[state=danger]/radio:text-white group-data-[state=selected]/radio:bg-heading group-data-[state=selected]/radio:text-surface group-data-[state=success]/radio:bg-emerald group-data-[state=success]/radio:text-white md:size-8 md:text-14"
    >
      {letter}
    </span>
  )
}
