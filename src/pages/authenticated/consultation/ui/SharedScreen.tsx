import { SHARED_SCREEN } from '../config/consultation'

/*
 * Демонстрация экрана: светлый «лист» с кейсом поверх видео. Он светлый в любой теме: data-theme="light"
 * возвращает внутри светлые токены. Текст из макета сокращается с шириной экрана, на мобильном термин
 * не выделен.
 */
export function SharedScreen() {
  const { highlight, label, text, title } = SHARED_SCREEN

  return (
    <section
      aria-label="Демонстрация экрана"
      className="absolute inset-x-4 inset-y-3 flex flex-col gap-2 rounded-10 bg-background p-4.5 text-body md:inset-4.5 md:gap-2.5 md:p-7 lg:inset-6 lg:gap-3.5 lg:px-14 lg:py-10"
      data-theme="light"
    >
      <p className="text-10 font-bold tracking-widest text-premium md:text-11 lg:text-12">
        <span className="lg:hidden">{label.short}</span>
        <span className="max-lg:hidden">{label.desktop}</span>
      </p>
      <p className="font-serif text-20 font-semibold text-heading md:text-26 lg:text-34">
        <i className="md:hidden">{title.mobile}</i>
        <i className="max-md:hidden">{title.case}</i>
        <span className="max-lg:hidden"> {title.year}</span>
      </p>
      <p className="font-serif text-15 leading-relaxed md:text-17 lg:text-19">
        <span className="lg:hidden">{text.shortBefore}</span>
        <span className="max-lg:hidden">{text.desktopBefore}</span>
        <mark className="bg-transparent text-inherit md:border-b-2 md:border-emerald md:bg-success-subtle md:px-0.75">
          {highlight}
        </mark>
        {text.after}
        <span className="lg:hidden">.</span>
        <span className="max-lg:hidden">…</span>
      </p>
    </section>
  )
}
