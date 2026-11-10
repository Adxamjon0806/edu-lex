import { CircleAlert, CircleCheck } from 'lucide-react'

import { classNames } from '~/shared/lib'

type AnswerFeedbackProps = Readonly<{
  correct: boolean
  explain: string
}>

// Итог проверки ответа: «Верно!» или «Не совсем» с пояснением. Иконка в макете есть только с md.
export function AnswerFeedback({ correct, explain }: AnswerFeedbackProps) {
  const Icon = correct ? CircleCheck : CircleAlert

  return (
    <div
      className={classNames(
        'flex items-start gap-3 rounded-14 p-3.5 md:px-5 md:py-4',
        correct ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger',
      )}
    >
      <Icon aria-hidden className="size-5.5 shrink-0 max-md:hidden" />
      <div className="flex flex-col gap-1">
        <p className="text-15 font-bold md:text-16">{correct ? 'Верно!' : 'Не совсем'}</p>
        <p className="text-14 leading-normal font-medium text-body md:text-15">{explain}</p>
      </div>
    </div>
  )
}
