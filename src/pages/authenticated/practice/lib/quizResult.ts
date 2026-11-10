import type { Mistake, Question } from '../model/types'

export function getMistakes(questions: readonly Question[], answers: readonly number[]): Mistake[] {
  return answers.flatMap((answer, index) => {
    const question = questions[index]
    if (answer === question.correct) return []
    return [
      {
        explain: question.explain,
        prompt: question.prompt,
        right: question.options[question.correct],
        yours: question.options[answer],
      },
    ]
  })
}

// Число верных ответов: answers[i] — индекс выбранного варианта в вопросе i.
export function getScore(questions: readonly Question[], answers: readonly number[]) {
  return answers.filter((answer, index) => answer === questions[index].correct).length
}

// Заголовок результата из макета: все верные, на один меньше или хуже.
export function getScoreTitle(score: number, total: number) {
  if (score === total) return 'Отлично!'
  if (score === total - 1) return 'Хороший результат'
  return 'Стоит повторить'
}
