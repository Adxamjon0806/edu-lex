import type { Ref } from 'react'

import { Badge, Button, Radio, RadioGroup } from '~/shared/ui'

import { OPTION_LETTERS } from '../config/quiz'
import type { Question } from '../model/types'
import { AnswerFeedback } from './AnswerFeedback'
import { OptionLetter } from './OptionLetter'

type QuestionCardProps = Readonly<{
  checked: boolean
  isLast: boolean
  onAction: () => void
  onSelect: (index: number) => void
  /** Заголовок вопроса: на него переходит фокус при смене вопроса. */
  promptRef: Ref<HTMLHeadingElement>
  question: Question
  selected: null | number
}>

/*
 * Вопрос теста. На десктопе — белая карточка, ниже lg — без карточки, прямо на фоне страницы (как в макете).
 * Варианты — нативные radio (стрелки переключают ответ): до проверки выбранный тёмный, после — верный
 * зелёный, выбранный неверный красный, остальные приглушены, а группа недоступна.
 * Кнопка: «Проверить» (недоступна, пока ответ не выбран) → «Далее» или «Смотреть результаты».
 * На мобильном кнопка прижата к низу экрана.
 */
export function QuestionCard({
  checked,
  isLast,
  onAction,
  onSelect,
  promptRef,
  question,
  selected,
}: QuestionCardProps) {
  const { caseText, correct, en, explain, options, prompt, type } = question

  function getOptionState(index: number) {
    if (!checked) return undefined
    if (index === correct) return 'success'
    return index === selected ? 'danger' : 'muted'
  }

  return (
    <article className="flex flex-1 flex-col gap-4 md:gap-5.5 lg:flex-none lg:gap-6 lg:rounded-22 lg:border lg:border-line lg:bg-surface lg:px-13 lg:py-11 lg:shadow-md">
      <div className="flex items-center gap-2.5">
        <Badge className="py-1.25 max-md:text-11" tone="navy">
          {type}
        </Badge>
        <span className="text-13 font-semibold text-muted max-md:hidden">{en}</span>
      </div>
      {caseText !== undefined && (
        <blockquote className="rounded-4 border-l-3 border-gold bg-surface p-3.5 font-serif text-15 leading-relaxed font-medium text-body italic md:px-5 md:py-4.5 md:text-17 lg:bg-background lg:px-5.5 lg:text-18">
          {caseText}
        </blockquote>
      )}
      <h2
        className="font-serif text-22 leading-snug font-semibold text-heading outline-none md:text-28 lg:text-30"
        ref={promptRef}
        tabIndex={-1}
      >
        {prompt}
      </h2>
      <RadioGroup
        className="grid gap-4 md:gap-3 lg:grid-cols-2 lg:gap-3.5"
        disabled={checked}
        legend="Варианты ответа"
        legendClassName="sr-only"
        onChange={(value) => {
          onSelect(Number(value))
        }}
        value={selected === null ? null : String(selected)}
      >
        {options.map((option, index) => (
          <Radio
            className="flex min-h-14 items-center gap-3 p-3.5 md:gap-3.5 md:px-5 md:py-4.5"
            key={option}
            selectedTone="navy"
            state={getOptionState(index)}
            value={String(index)}
          >
            <OptionLetter letter={OPTION_LETTERS[index]} />
            <span className="text-15 leading-snug font-semibold text-body md:text-16">{option}</span>
          </Radio>
        ))}
      </RadioGroup>
      {/* Живая область есть всегда, чтобы скринридер объявил появившийся итог проверки. */}
      <div aria-live="polite" className="empty:hidden">
        {checked && <AnswerFeedback correct={selected === correct} explain={explain} />}
      </div>
      <Button
        className="w-full py-4.25 max-md:mt-auto max-md:rounded-14 md:py-4.5 lg:w-auto lg:self-end lg:px-9 lg:py-3.75"
        disabled={!checked && selected === null}
        onClick={onAction}
        size="lg"
      >
        {getActionLabel(checked, isLast)}
      </Button>
    </article>
  )
}

function getActionLabel(checked: boolean, isLast: boolean) {
  if (!checked) return 'Проверить'
  return isLast ? 'Смотреть результаты' : 'Далее'
}
