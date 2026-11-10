import { Rotate3d, Volume2 } from 'lucide-react'

import { classNames } from '~/shared/lib'
import { Badge, IconButton } from '~/shared/ui'

import type { Term } from '../model/types'

type FlashcardProps = Readonly<{
  flipped: boolean
  onFlip: () => void
  /** Позиция в колоде, например «2 / 3». */
  position: string
  term: Term
}>

/*
 * Смарт-карточка термина, переворачивается по нажатию (3D-поворот из макета, без анимации при
 * prefers-reduced-motion). Лицевая сторона — термин и транскрипция, оборот (navy) — определение,
 * пример с источником и перевод. Высота из макета: 430px до md, 520px на планшете, 440px на десктопе.
 * Каждая сторона — кнопка переворота во всю карточку; невидимая сторона недоступна (inert).
 * На обороте поверх неё кнопка озвучки, остальное содержимое пропускает нажатия к кнопке переворота.
 */
export function Flashcard({ flipped, onFlip, position, term }: FlashcardProps) {
  return (
    <div className="h-107.5 w-full perspective-card md:h-130 lg:h-110 lg:max-w-180">
      <div
        className={classNames(
          'relative size-full transition-transform duration-600 ease-flip transform-3d motion-reduce:transition-none',
          flipped && 'rotate-y-180',
        )}
      >
        <button
          aria-label={`${term.en}. Показать определение`}
          className={classNames(
            'absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-22 border border-line bg-surface px-4 shadow-lg backface-hidden',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald',
            'md:gap-3.5 md:rounded-24 md:shadow-xl lg:p-10',
          )}
          inert={flipped}
          onClick={onFlip}
          type="button"
        >
          <Badge
            className="absolute top-4.5 left-5 max-md:px-2 max-md:text-11 md:top-6 md:left-7 lg:top-7 lg:left-8"
            tone="success"
          >
            {term.field}
          </Badge>
          <span className="absolute top-4.5 right-5 text-12 font-semibold text-muted md:top-6 md:right-7 md:text-13 lg:top-7 lg:right-8">
            {position}
          </span>
          <span className="text-center font-serif text-42 leading-none font-semibold text-body md:text-60 lg:text-68">
            {term.en}
          </span>
          <span className="text-16 font-medium text-muted md:text-18">{term.ipa}</span>
          <span className="absolute bottom-4.5 flex items-center gap-1.5 text-12 font-semibold text-hint md:bottom-6 md:text-13 lg:bottom-7">
            <Rotate3d aria-hidden className="size-4 max-lg:hidden" />
            Нажмите, чтобы перевернуть
          </span>
        </button>

        <div
          className="absolute inset-0 rotate-y-180 rounded-22 bg-navy text-white backface-hidden md:rounded-24 lg:shadow-2xl"
          inert={!flipped}
        >
          <button
            aria-label={`${term.en}. Показать термин`}
            className="absolute inset-0 cursor-pointer rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
            onClick={onFlip}
            type="button"
          />
          <div className="pointer-events-none relative flex h-full flex-col gap-3.5 p-5.5 md:gap-4.5 md:p-9 lg:px-11 lg:py-10">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-serif text-24 font-semibold md:text-32 lg:text-34">{term.en}</h2>
              <IconButton
                aria-label={`Произношение: ${term.en}`}
                className="pointer-events-auto max-md:size-11.5"
                glow
                icon={Volume2}
                size={52}
                variant="primary"
              />
            </div>
            <p className="text-15 leading-relaxed font-medium text-navy-50 md:text-18">{term.definition}</p>
            <blockquote className="flex flex-col gap-1 border-l-2 border-gold pl-3 md:gap-1.5 md:pl-4">
              <p className="font-serif text-16 leading-normal font-medium italic md:text-18">{term.example}</p>
              <cite className="text-11 font-semibold text-navy-200 not-italic md:text-12">{term.source}</cite>
            </blockquote>
            <p className="mt-auto flex items-center gap-2 md:gap-2.5">
              <span className="text-11 font-semibold tracking-wider text-navy-200 md:text-12">ПЕРЕВОД</span>
              <span className="text-16 font-bold text-emerald-300 md:text-18">{term.ru}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
