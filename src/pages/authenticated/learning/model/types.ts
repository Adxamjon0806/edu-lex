/** Абзац кейса: обычный текст вперемешку с подсвеченными терминами. */
export type CaseParagraph = readonly (Readonly<{ term: HighlightKey; text: string }> | string)[]

export type HighlightedTerm = Readonly<{
  definition?: string
  en: string
  ru?: string
}>

export type HighlightKey = 'acceptance' | 'consideration' | 'invitation-to-treat' | 'unilateral-offer'

export type LearningTab = 'cards' | 'speech' | 'text'

export type Term = Readonly<{
  definition: string
  en: string
  /** Пример употребления в кавычках. */
  example: string
  /** Область права, метка на лицевой стороне карточки. */
  field: string
  ipa: string
  ru: string
  /** Источник примера. */
  source: string
}>
