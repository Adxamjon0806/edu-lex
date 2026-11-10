import { FileText, Layers, Mic, type LucideIcon } from 'lucide-react'

import type { CaseParagraph, HighlightedTerm, HighlightKey, LearningTab, Term } from '../model/types'

// Моковые данные экрана «03 Learning Hub» бандла. Заменятся данными с сервера.

export const MODULE = {
  course: 'Corporate Law · Модуль 4',
  title: 'Contract Formation',
} as const

export const LEARNING_TABS: readonly Readonly<{
  icon: LucideIcon
  label: string
  shortLabel: string
  value: LearningTab
}>[] = [
  { icon: Layers, label: 'Смарт-карточки', shortLabel: 'Карточки', value: 'cards' },
  { icon: FileText, label: 'Текст и кейс', shortLabel: 'Текст', value: 'text' },
  { icon: Mic, label: 'Речь', shortLabel: 'Речь', value: 'speech' },
]

export const TERMS: readonly Term[] = [
  {
    definition:
      'A prior judicial decision that serves as an authoritative rule for deciding later cases with similar facts.',
    en: 'Precedent',
    example: '“The Court of Appeal followed the precedent set in Donoghue v Stevenson.”',
    field: 'Common Law',
    ipa: '/ˈpres.ɪ.dənt/',
    ru: 'Прецедент',
    source: 'Elliott & Quinn, English Legal System',
  },
  {
    definition:
      'Something of value given by each party in exchange for the promise of the other; required for a binding contract.',
    en: 'Consideration',
    example: '“Using the smoke ball was held to be good consideration.”',
    field: 'Contract Law',
    ipa: '/kənˌsɪd.əˈreɪ.ʃən/',
    ru: 'Встречное удовлетворение',
    source: 'Carlill v Carbolic Smoke Ball Co [1893]',
  },
  {
    definition: 'A reasonable investigation of a company or asset before entering into a transaction.',
    en: 'Due diligence',
    example: '“Due diligence revealed undisclosed liabilities in the target.”',
    field: 'Corporate Law',
    ipa: '/ˌdʒuː ˈdɪl.ɪ.dʒəns/',
    ru: 'Юридическая проверка',
    source: 'Harvard Business School Case 9-218',
  },
]

// Термины модуля, выученные до текущей колоды: в списке они идут первыми.
export const LEARNED_TERMS: readonly Readonly<{ en: string; ru: string }>[] = [
  { en: 'Offer', ru: 'Оферта' },
  { en: 'Acceptance', ru: 'Акцепт' },
]

export const CASE_BRIEF = {
  label: {
    desktop: 'Case Brief · Court of Appeal, 1893',
    short: 'Case Brief · 1893',
  },
  title: 'Carlill v Carbolic Smoke Ball Co',
} as const

/*
 * Текст кейса в макете сокращается с шириной экрана. Подсвеченные термины — отдельные части абзаца:
 * по нажатию на них карточка «Выделенный термин» показывает выбранный.
 */
export const CASE_TEXT: Readonly<Record<'desktop' | 'mobile' | 'tablet', readonly CaseParagraph[]>> = {
  desktop: [
    [
      'The defendants published an advertisement promising £100 to anyone who contracted influenza after using their smoke ball. The court held that the advertisement was not a mere ',
      { term: 'invitation-to-treat', text: 'invitation to treat' },
      ' but a ',
      { term: 'unilateral-offer', text: 'unilateral offer' },
      ' made to the world at large.',
    ],
    [
      'Performance of the conditions amounted to ',
      { term: 'acceptance', text: 'acceptance' },
      ', and the inconvenience of using the product was sufficient ',
      { term: 'consideration', text: 'consideration' },
      '. The deposit of £1,000 showed a clear intention to create legal relations.',
    ],
  ],
  mobile: [
    [
      'The court held the advertisement was not an ',
      { term: 'invitation-to-treat', text: 'invitation to treat' },
      ' but a ',
      { term: 'unilateral-offer', text: 'unilateral offer' },
      '. Performance amounted to ',
      { term: 'acceptance', text: 'acceptance' },
      '; using the product was good ',
      { term: 'consideration', text: 'consideration' },
      '.',
    ],
  ],
  tablet: [
    [
      'The court held that the advertisement was not a mere ',
      { term: 'invitation-to-treat', text: 'invitation to treat' },
      ' but a ',
      { term: 'unilateral-offer', text: 'unilateral offer' },
      ' made to the world at large.',
    ],
    [
      'Performance of the conditions amounted to ',
      { term: 'acceptance', text: 'acceptance' },
      ', and using the product was sufficient ',
      { term: 'consideration', text: 'consideration' },
      '.',
    ],
  ],
}

/*
 * Карточки подсвеченных терминов. В бандле перевод и определение есть только у unilateral offer
 * (карточка «Выделенный термин») и consideration (карточка термина). У остальных их нет, поэтому
 * они не заполнены: карточка показывает только то, что есть.
 */
export const HIGHLIGHTED_TERMS: Readonly<Record<HighlightKey, HighlightedTerm>> = {
  acceptance: { en: 'Acceptance', ru: 'Акцепт' },
  consideration: {
    definition:
      'Something of value given by each party in exchange for the promise of the other; required for a binding contract.',
    en: 'Consideration',
    ru: 'Встречное удовлетворение',
  },
  'invitation-to-treat': { en: 'Invitation to treat' },
  'unilateral-offer': {
    definition: 'An offer accepted by performing an act rather than by a return promise.',
    en: 'Unilateral offer',
    ru: 'Односторонняя оферта',
  },
}

export const DEFAULT_HIGHLIGHT: HighlightKey = 'unilateral-offer'

export const LECTURE = {
  duration: '6:24',
  position: '2:11',
  progress: 34,
  title: 'Offer vs invitation to treat',
} as const

// Высоты полосок волны записи в пикселях макета. На мобильном видны первые 22.
export const WAVE_HEIGHTS: readonly number[] = [
  18, 30, 46, 62, 40, 70, 54, 32, 60, 76, 48, 28, 52, 66, 38, 24, 44, 72, 58, 36, 20, 50, 64, 42, 30, 56, 68, 34, 22,
  46, 26, 16,
]
export const WAVE_MOBILE_COUNT = 22

export const LAST_ATTEMPT = 'Последняя попытка: 86% · ударение верное'
