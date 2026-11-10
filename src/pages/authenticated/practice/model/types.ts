// Ошибка для разбора после теста.
export type Mistake = Readonly<{
  explain: string
  prompt: string
  right: string
  yours: string
}>

export type Question = Readonly<{
  /** Текст кейса над вопросом (ситуационный тест). */
  caseText?: string
  /** Индекс верного варианта в options. */
  correct: number
  /** Подпись типа по-английски, в макете её нет на мобильном. */
  en: string
  explain: string
  options: readonly string[]
  prompt: string
  type: string
}>
