import type { Question } from '../model/types'

// Моковые данные экрана «04 Practice & Quiz» бандла. Заменятся данными с сервера.

export const QUIZ_MODULE = {
  // Подпись над прогрессом на десктопе и в шапке на планшете.
  desktop: 'Модуль 4 · Contract Formation',
  tablet: 'Практика · Модуль 4',
} as const

export const QUESTIONS: readonly Question[] = [
  {
    correct: 0,
    en: 'Fill the gap · precedent context',
    explain: 'Precedent — решение вышестоящего суда, обязательное для нижестоящих (stare decisis).',
    options: ['precedent', 'statute', 'tort', 'verdict'],
    prompt: 'The Court of Appeal was bound to follow the ____ established by the House of Lords.',
    type: 'Заполните пропуск',
  },
  {
    correct: 0,
    en: 'Match term ↔ definition',
    explain: 'Consideration — встречное удовлетворение; без него обещание не имеет исковой силы.',
    options: [
      'Something of value exchanged by each party',
      'A formal written judgment of the court',
      'A breach of a statutory duty',
      'A negotiation before an offer is made',
    ],
    prompt: 'Выберите определение для термина «Consideration».',
    type: 'Сопоставление',
  },
  {
    caseText:
      'Carbolic Smoke Ball Co. promised £100 to anyone who used its product and still caught influenza, depositing £1,000 with a bank. Mrs Carlill used it and fell ill.',
    correct: 1,
    en: 'Case-based',
    explain: 'Unilateral offer — оферта неопределённому кругу лиц, акцептуемая самим исполнением условий.',
    options: ['Invitation to treat', 'Unilateral offer', 'Mere puffery', 'Bilateral contract'],
    prompt: 'Как суд квалифицировал объявление компании?',
    type: 'Ситуационный тест',
  },
]

export const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const

export const XP_PER_CORRECT = 20

// Серия в плашке XP на десктопе.
export const STREAK = 'серия 14 дней'
