import { useState } from 'react'

import { classNames } from '~/shared/lib'
import { Card } from '~/shared/ui'

import { CASE_BRIEF, CASE_TEXT, DEFAULT_HIGHLIGHT, HIGHLIGHTED_TERMS } from '../config/learning'
import type { CaseParagraph, HighlightKey } from '../model/types'
import { HighlightedTermCard } from './HighlightedTermCard'
import { LecturePlayer } from './LecturePlayer'

type CaseParagraphsProps = Readonly<{
  className: string
  onSelect: (term: HighlightKey) => void
  paragraphs: readonly CaseParagraph[]
  selected: HighlightKey
}>

/*
 * Режим «Текст и кейс». Раскладка из макета:
 * - до md — разбор кейса, под ним мини-лекция;
 * - md–lg — мини-лекция полосой над разбором;
 * - от lg — разбор слева, справа мини-лекция и «Выделенный термин».
 * Подсвеченные термины — кнопки: выбранный показывает карточка «Выделенный термин». В макете она есть
 * только на десктопе, поэтому на узких экранах она появляется под разбором после первого нажатия на термин.
 */
export function CaseTextTab() {
  const [selected, setSelected] = useState<HighlightKey>(DEFAULT_HIGHLIGHT)
  const [touched, setTouched] = useState(false)

  function selectTerm(term: HighlightKey) {
    setSelected(term)
    setTouched(true)
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:grid lg:grid-cols-[1fr_--spacing(80)] lg:items-start">
      <Card
        aria-labelledby="case-brief-title"
        as="article"
        className="flex flex-col gap-3 p-5 md:gap-4 md:p-8 lg:gap-4.5 lg:px-12 lg:py-10"
      >
        <p className="text-11 font-bold tracking-widest text-premium uppercase md:text-12">
          <span className="lg:hidden">{CASE_BRIEF.label.short}</span>
          <span className="max-lg:hidden">{CASE_BRIEF.label.desktop}</span>
        </p>
        <h2
          className="font-serif text-22 font-semibold text-heading italic md:text-28 lg:text-34"
          id="case-brief-title"
        >
          {CASE_BRIEF.title}
        </h2>
        <CaseParagraphs className="md:hidden" onSelect={selectTerm} paragraphs={CASE_TEXT.mobile} selected={selected} />
        <CaseParagraphs
          className="max-md:hidden lg:hidden"
          onSelect={selectTerm}
          paragraphs={CASE_TEXT.tablet}
          selected={selected}
        />
        <CaseParagraphs
          className="max-lg:hidden"
          onSelect={selectTerm}
          paragraphs={CASE_TEXT.desktop}
          selected={selected}
        />
      </Card>
      <div className="flex flex-col gap-4 max-lg:contents">
        <LecturePlayer className="max-md:order-2 md:max-lg:order-first" />
        <HighlightedTermCard
          className={classNames(!touched && 'max-lg:hidden', 'max-md:order-1 md:max-lg:order-last')}
          term={HIGHLIGHTED_TERMS[selected]}
        />
      </div>
    </div>
  )
}

// Абзацы кейса. Шрифт Spectral из макета: 16px до md, 18px на планшете, 19px на десктопе.
function CaseParagraphs({ className, onSelect, paragraphs, selected }: CaseParagraphsProps) {
  return (
    <div className={classNames('flex flex-col gap-3 md:gap-4 lg:gap-4.5', className)}>
      {paragraphs.map((paragraph, index) => (
        // Абзацы статичны и не переставляются, поэтому индекс — надёжный ключ.
        // eslint-disable-next-line react-x/no-array-index-key
        <p className="font-serif text-16 leading-loose text-body md:text-18 lg:text-19" key={index}>
          {paragraph.map((part) =>
            typeof part === 'string' ? (
              part
            ) : (
              <button
                aria-pressed={part.term === selected}
                className={classNames(
                  'cursor-pointer border-b-2 border-emerald bg-success-subtle px-0.5 transition-colors md:px-0.75',
                  'hover:bg-emerald/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald',
                  'aria-pressed:bg-emerald/25',
                )}
                key={part.term}
                onClick={() => {
                  onSelect(part.term)
                }}
                type="button"
              >
                {part.text}
              </button>
            ),
          )}
        </p>
      ))}
    </div>
  )
}
