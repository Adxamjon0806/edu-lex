/*
 * Сообщение чата сессии:
 * - text — текст ментора или свой; link — ссылка в конце текста;
 * - file — свой файл;
 * - moderation — плашка автомодерации вместо скрытого сообщения.
 * short — короткий текст для планшета; tablet — показывать ли сообщение в чате планшета.
 */
export type ChatMessage =
  | Readonly<{ id: string; kind: 'file'; name: string; size: string; tablet?: boolean; time: string }>
  | Readonly<{ id: string; kind: 'moderation'; short?: string; tablet?: boolean; text: string }>
  | Readonly<{
      id: string
      kind: 'text'
      link?: string
      mine: boolean
      tablet?: boolean
      text: string
      time: string
    }>
