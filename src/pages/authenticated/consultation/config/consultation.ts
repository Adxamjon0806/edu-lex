import type { ChatMessage } from '../model/types'

// Моковые данные экрана «09 Видеоконсультация» бандла. Заменятся данными сессии с сервера.

// Ментор сессии из entities/mentor.
export const SESSION_MENTOR_ID = '1'

export const SESSION = {
  // Осталось времени на старте, в секундах: 47:27, как в прототипе.
  remainingSeconds: 2847,
  role: 'ментор',
  secure: 'Защищённое соединение · средства в эскроу',
  studentInitials: 'АК',
  topic: 'Contract Law · Offer & Acceptance',
  // Подпись под именем на мобильном: «Contract Law · эскроу $35».
  topicShort: 'Contract Law',
} as const

export const SHARED_SCREEN = {
  // Текст кейса сокращается с шириной экрана; выделенный термин — отдельно.
  highlight: 'unilateral offer',
  label: {
    desktop: 'ДЕМОНСТРАЦИЯ ЭКРАНА · CASE BRIEF',
    short: 'ДЕМОНСТРАЦИЯ ЭКРАНА',
  },
  text: {
    after: ' to the world at large',
    desktopBefore: 'The advertisement was not a mere invitation to treat but a ',
    shortBefore: '…a ',
  },
  title: {
    case: 'Carlill v Carbolic Smoke Ball Co',
    mobile: 'Carlill v Carbolic',
    year: '[1893]',
  },
} as const

export const CHAT_TITLE = 'Чат сессии'

export const CHAT_MESSAGES: readonly ChatMessage[] = [
  {
    id: 'm1',
    kind: 'text',
    mine: false,
    tablet: true,
    text: 'Откройте кейс Carlill — разберём, почему это оферта.',
    time: '14:52',
  },
  { id: 'm2', kind: 'file', name: 'Carlill_case_brief.pdf', size: '240 КБ', time: '14:53' },
  {
    id: 'm3',
    kind: 'moderation',
    short: 'Сообщение скрыто: передача контактов запрещена правилами платформы.',
    tablet: true,
    text: 'Сообщение скрыто автомодерацией: передача личных контактов и реквизитов карт запрещена правилами платформы.',
  },
  {
    id: 'm4',
    kind: 'text',
    link: 'oxford.law/contract-ch3',
    mine: false,
    text: 'Ссылка на главу: ',
    time: '14:56',
  },
]

// Превью чата на мобильном: в макете — два коротких сообщения без поля ввода.
export const CHAT_PREVIEW = {
  message: 'Откройте кейс Carlill — разберём оферту.',
  moderation: 'Сообщение скрыто автомодерацией',
} as const

export const ENDED_TEXTS = {
  home: 'На главную',
  rateHint: 'Оцените консультацию — это поможет другим студентам.',
  rejoin: 'Вернуться',
  title: 'Сессия завершена',
  // «$35 переведены из эскроу на баланс ментора.» на десктопе и «…ментору» ниже.
  transferred: 'переведены из эскроу на баланс ментора.',
  transferredShort: 'переведены из эскроу ментору',
} as const

// Оценка по умолчанию: в макете горят все пять звёзд.
export const DEFAULT_RATING = 5
