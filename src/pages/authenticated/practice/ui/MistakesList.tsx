import type { ReactNode } from 'react'

import { Badge } from '~/shared/ui'

import type { Mistake } from '../model/types'

/*
 * Разбор ошибок после теста: вопрос, ваш ответ и верный, пояснение. Без ошибок — плашка «Ошибок нет».
 * На десктопе — белая карточка справа от итога, на планшете — список на фоне страницы.
 * На мобильном в макете нет заголовка (он остаётся для скринридера), пояснений и плашки без ошибок,
 * а ответы идут друг под другом на всю ширину.
 */
export function MistakesList({ mistakes }: Readonly<{ mistakes: readonly Mistake[] }>) {
  return (
    <section
      aria-labelledby="mistakes-title"
      className="flex flex-col gap-4 md:gap-5.5 lg:gap-4 lg:rounded-22 lg:border lg:border-line lg:bg-surface lg:p-8"
    >
      <h2 className="font-serif text-24 font-semibold text-heading max-md:sr-only" id="mistakes-title">
        Разбор ошибок
      </h2>
      {mistakes.length === 0 ? (
        <p className="rounded-14 bg-success-subtle p-5 text-15 font-semibold text-success max-md:hidden">
          Ошибок нет — модуль закреплён.
        </p>
      ) : (
        <ul className="flex flex-col gap-4 md:gap-5.5 lg:gap-4">
          {mistakes.map(({ explain, prompt, right, yours }) => (
            <li
              className="flex flex-col gap-2 rounded-14 border border-line bg-surface p-4 md:gap-2.5 md:p-5"
              key={prompt}
            >
              <p className="font-serif text-15 leading-snug font-semibold text-body md:text-17">{prompt}</p>
              <p className="flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-2.5">
                <MistakeAnswer tone="danger">Ваш ответ: {yours}</MistakeAnswer>
                <MistakeAnswer tone="success">Верно: {right}</MistakeAnswer>
              </p>
              <p className="text-14 leading-normal font-medium text-body-secondary max-md:hidden">{explain}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

// Длинный ответ переносится, на мобильном плашка во всю ширину.
function MistakeAnswer({ children, tone }: Readonly<{ children: ReactNode; tone: 'danger' | 'success' }>) {
  return (
    <Badge className="whitespace-normal max-md:w-full max-md:px-2.5 md:text-14" size="lg" tone={tone}>
      {children}
    </Badge>
  )
}
