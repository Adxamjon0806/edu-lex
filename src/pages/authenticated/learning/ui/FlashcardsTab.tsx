import { useState } from 'react'

import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Button, IconButton } from '~/shared/ui'

import type { Term } from '../model/types'
import { Flashcard } from './Flashcard'
import { ModuleTermsList } from './ModuleTermsList'

type FlashcardsTabProps = Readonly<{
  onTermChange: (index: number) => void
  termIndex: number
  terms: readonly Term[]
}>

/*
 * Режим «Смарт-карточки»: карточка термина и кнопки под ней, на десктопе справа — термины модуля.
 * Кнопки из макета: до md — «Позже» и «Знаю» поровну; на планшете слева ещё «назад» (56px);
 * на десктопе по центру «назад», «Повторить позже», «Знаю», «вперёд» (52px).
 * Пока это сухая вёрстка: «Знаю» и «Повторить позже» просто открывают следующий термин.
 */
export function FlashcardsTab({ onTermChange, termIndex, terms }: FlashcardsTabProps) {
  const [flipped, setFlipped] = useState(false)
  const term = terms[termIndex]

  function goTo(index: number) {
    onTermChange((index + terms.length) % terms.length)
    setFlipped(false)
  }
  function showPrevious() {
    goTo(termIndex - 1)
  }
  function showNext() {
    goTo(termIndex + 1)
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:grid lg:grid-cols-[1fr_--spacing(80)]">
      <div className="flex flex-col gap-4 md:gap-6 lg:items-center lg:gap-5 lg:pt-3">
        <Flashcard
          flipped={flipped}
          onFlip={() => {
            setFlipped((value) => !value)
          }}
          position={`${String(termIndex + 1)} / ${String(terms.length)}`}
          term={term}
        />
        <div className="flex gap-2.5 md:gap-3 lg:items-center">
          <IconButton
            aria-label="Предыдущий термин"
            className="max-md:hidden lg:size-13"
            icon={ArrowLeft}
            onClick={showPrevious}
            size={56}
          />
          <Button
            className="flex-1 py-3.5 md:text-15 lg:flex-none lg:px-5.5 lg:text-14"
            onClick={showNext}
            variant="danger-outline"
          >
            <span className="md:hidden">Позже</span>
            <span className="max-md:hidden">Повторить позже</span>
          </Button>
          <Button className="flex-1 py-3.5 md:text-15 lg:flex-none lg:px-5.5 lg:text-14" onClick={showNext}>
            Знаю
          </Button>
          <IconButton
            aria-label="Следующий термин"
            className="max-lg:hidden"
            icon={ArrowRight}
            onClick={showNext}
            size={52}
          />
        </div>
      </div>
      <ModuleTermsList className="max-lg:hidden" currentIndex={termIndex} terms={terms} />
    </div>
  )
}
