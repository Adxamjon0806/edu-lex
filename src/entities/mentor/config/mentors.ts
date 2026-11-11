import type { Mentor, MentorReview } from '../model/types'

// Моковые данные менторов из экранов «06 Mentor Marketplace» и «10 Карточка ментора». Заменятся данными с сервера.

export const MENTORS: readonly Mentor[] = [
  {
    bio: 'Юрист международной практики, 7 лет готовит студентов к LLM в UK. Разбирает кейсы английского договорного права и помогает с Personal Statement.',
    degree: 'LLM · University of Cambridge',
    documents: ['LLM Diploma · Cambridge', 'IELTS Academic 8.5', 'Solicitor, SRA'],
    id: '1',
    initials: 'ДР',
    name: 'Дилноза Рахимова',
    price: 35,
    rating: '4.9',
    reviews: 126,
    // В макете число сессий — отзывы × 3 + 40.
    sessions: 418,
    subject: 'law',
    subjectLabel: 'Право',
    tags: ['Contract Law', 'LLM Admissions'],
  },
  {
    bio: 'Преподаватель LSE, научный руководитель магистерских работ. Академическое письмо и аргументация в публичном праве.',
    degree: 'PhD Public Policy · LSE',
    documents: ['PhD · LSE', 'Fellowship HEA'],
    id: '2',
    initials: 'JW',
    name: 'Dr. James Whitfield',
    price: 60,
    rating: '5.0',
    reviews: 88,
    // В макете число сессий — отзывы × 3 + 40.
    sessions: 304,
    subject: 'law',
    subjectLabel: 'Публичная политика',
    tags: ['Public Law', 'Research Writing'],
  },
  {
    bio: 'Экс-консультант McKinsey. Готовит к MBA-интервью и case-разборам Harvard Business School.',
    degree: 'MBA · INSEAD',
    documents: ['MBA · INSEAD', 'GMAT 740'],
    id: '3',
    initials: 'ТА',
    name: 'Тимур Алиев',
    price: 45,
    rating: '4.8',
    reviews: 64,
    // В макете число сессий — отзывы × 3 + 40.
    sessions: 232,
    subject: 'biz',
    subjectLabel: 'Бизнес',
    tags: ['Case Interview', 'Finance'],
  },
  {
    bio: 'Эпидемиолог, магистр общественного здравоохранения. Медицинская терминология и чтение клинических исследований.',
    degree: 'MD, MPH · Johns Hopkins',
    documents: ['MPH · Johns Hopkins', 'MD · TMA', 'TOEFL 114'],
    id: '4',
    initials: 'МЮ',
    name: 'Dr. Малика Юсупова',
    price: 50,
    rating: '4.9',
    reviews: 51,
    // В макете число сессий — отзывы × 3 + 40.
    sessions: 193,
    subject: 'med',
    subjectLabel: 'Медицина',
    tags: ['Public Health', 'USMLE Vocab'],
  },
  {
    bio: 'ML-инженер в Мюнхене. Техническая лексика, чтение научных статей и подготовка к поступлению в EU.',
    degree: 'MSc Computer Science · TU Munich',
    documents: ['MSc · TU Munich', 'IELTS 8.0'],
    id: '5',
    initials: 'СН',
    name: 'Сардор Нематов',
    price: 30,
    rating: '4.7',
    reviews: 73,
    // В макете число сессий — отзывы × 3 + 40.
    sessions: 259,
    subject: 'it',
    subjectLabel: 'IT',
    tags: ['Tech Interviews', 'CS Papers'],
  },
  {
    bio: 'Экзаменатор IELTS, специализация — академическое письмо и устная речь для профильных программ.',
    degree: 'MA TESOL · University of Warwick',
    documents: ['MA TESOL · Warwick', 'CELTA', 'IELTS Examiner'],
    id: '6',
    initials: 'АК',
    name: 'Анна Ким',
    price: 25,
    rating: '4.9',
    reviews: 142,
    // В макете число сессий — отзывы × 3 + 40.
    sessions: 466,
    subject: 'law',
    subjectLabel: 'Academic English',
    tags: ['IELTS Writing', 'Speaking'],
  },
]

// Языки и отзывы в макете одинаковые у всех менторов.
export const MENTOR_LANGUAGES = 'English, Русский, O‘zbek'

export const MENTOR_REVIEWS: readonly MentorReview[] = [
  { author: 'Азиз К.', text: 'Разобрали Carlill за одну сессию — наконец понял разницу offer и invitation to treat.' },
  { author: 'Нигора Т.', text: 'Помогла переписать Personal Statement, получила оффер из UCL.' },
]
