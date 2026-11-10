import { useEffect, useRef, useState } from 'react'

import { QUESTIONS, XP_PER_CORRECT } from '../config/quiz'
import { getMistakes, getScore, getScoreTitle } from '../lib/quizResult'
import { QuestionCard } from './QuestionCard'
import { QuizProgress } from './QuizProgress'
import { QuizResults } from './QuizResults'

/*
 * Практика и тест (экран «04 Practice & Quiz»): три вопроса подряд, затем результаты с разбором ошибок.
 * Пока это вёрстка на локальном состоянии, как в прототипе: ответы никуда не отправляются.
 * До lg экран полноэкранный, без навигации (staticData.focusMode маршрута): шапка теста на всю ширину.
 * На десктопе содержимое не шире 952px (ширина из макета) и по центру.
 */
export function PracticePage() {
  const total = QUESTIONS.length
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selected, setSelected] = useState<null | number>(null)
  const [checked, setChecked] = useState(false)
  // Выбранные варианты по вопросам.
  const [answers, setAnswers] = useState<readonly number[]>([])
  const [done, setDone] = useState(false)

  const promptRef = useRef<HTMLHeadingElement>(null)
  const resultTitleRef = useRef<HTMLHeadingElement>(null)
  // Фокус переносим только после действий пользователя, а не при первом показе страницы.
  const shouldMoveFocus = useRef(false)
  useEffect(() => {
    if (!shouldMoveFocus.current) return
    shouldMoveFocus.current = false
    const target = done ? resultTitleRef : promptRef
    target.current?.focus()
  }, [done, questionIndex])

  const isLast = questionIndex === total - 1

  function handleAction() {
    if (!checked) {
      if (selected === null) return
      setChecked(true)
      setAnswers((previous) => [...previous, selected])
      return
    }
    shouldMoveFocus.current = true
    if (isLast) {
      setDone(true)
      return
    }
    setQuestionIndex((index) => index + 1)
    setSelected(null)
    setChecked(false)
  }

  function handleRestart() {
    shouldMoveFocus.current = true
    setQuestionIndex(0)
    setSelected(null)
    setChecked(false)
    setAnswers([])
    setDone(false)
  }

  const score = getScore(QUESTIONS, answers)
  // Проверенные вопросы: текущий считается после «Проверить».
  const answered = done ? total : answers.length

  return (
    <div className="flex flex-1 flex-col lg:mx-auto lg:w-full lg:max-w-238 lg:flex-none lg:gap-7">
      <QuizProgress answered={answered} current={questionIndex + 1} done={done} total={total} />
      <div className="flex flex-1 flex-col px-5 pt-4.5 pb-7 md:p-10 lg:p-0">
        {done ? (
          <QuizResults
            mistakes={getMistakes(QUESTIONS, answers)}
            onRestart={handleRestart}
            score={score}
            title={getScoreTitle(score, total)}
            titleRef={resultTitleRef}
            total={total}
            xp={score * XP_PER_CORRECT}
          />
        ) : (
          <QuestionCard
            checked={checked}
            isLast={isLast}
            onAction={handleAction}
            onSelect={setSelected}
            promptRef={promptRef}
            question={QUESTIONS[questionIndex]}
            selected={selected}
          />
        )}
      </div>
    </div>
  )
}
