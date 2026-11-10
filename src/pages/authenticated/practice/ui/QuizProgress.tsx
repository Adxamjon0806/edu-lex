import { Link } from '@tanstack/react-router'
import { X } from 'lucide-react'

import { iconButtonVariants, ProgressBar } from '~/shared/ui'

import { QUIZ_MODULE } from '../config/quiz'

type QuizProgressProps = Readonly<{
  /** Сколько вопросов уже проверено. */
  answered: number
  /** Номер текущего вопроса с единицы. */
  current: number
  done: boolean
  total: number
}>

/*
 * Шапка теста с прогрессом, три вида из макета:
 * - до md — строка: крестик, полоска и короткий счётчик «1/3»; название только для скринридера;
 * - md–lg — белая шапка на всю ширину: крестик, «Практика · Модуль 4», счётчик и полоска ниже;
 * - от lg — подпись модуля и счётчик над полоской, без крестика (есть сайдбар).
 * Крестик закрывает тест и ведёт к обучению.
 */
export function QuizProgress({ answered, current, done, total }: QuizProgressProps) {
  const counter = done ? 'Завершено' : `Вопрос ${String(current)} из ${String(total)}`

  return (
    <header className="flex flex-wrap items-center gap-3 px-5 pt-3.5 md:gap-x-4 md:gap-y-3.5 md:border-b md:border-line md:bg-surface md:px-10 md:py-7 lg:gap-y-3 lg:border-0 lg:bg-transparent lg:p-0">
      <Link
        aria-label="Закрыть тест"
        className={iconButtonVariants({ className: 'max-md:border-transparent max-md:bg-transparent lg:hidden' })}
        to="/learning"
      >
        <X aria-hidden />
      </Link>
      <h1 className="flex-1 text-center text-15 font-semibold text-body max-md:sr-only lg:text-left lg:text-14 lg:text-muted">
        <span className="lg:hidden">{QUIZ_MODULE.tablet}</span>
        <span className="max-lg:hidden">{QUIZ_MODULE.desktop}</span>
      </h1>
      <ProgressBar
        className="flex-1 md:order-last md:basis-full"
        label="Прогресс теста"
        size={8}
        value={(answered / total) * 100}
        valueText={counter}
      />
      <p className="text-13 font-bold text-heading md:text-14">
        <span className="md:hidden">
          {done ? `${String(total)}/${String(total)}` : `${String(current)}/${String(total)}`}
        </span>
        <span className="max-md:hidden">{counter}</span>
      </p>
    </header>
  )
}
