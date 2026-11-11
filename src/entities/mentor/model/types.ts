export type Mentor = Readonly<{
  bio: string
  /** Степень и вуз, например «LLM · University of Cambridge». */
  degree: string
  /** Подтверждённые документы. */
  documents: readonly string[]
  /** Идентификатор в адресе карточки /mentors/$mentorId. Пока простые числа, позже — uuid. */
  id: string
  initials: string
  name: string
  /** Цена сессии 50 минут в долларах. */
  price: number
  rating: string
  /** Число отзывов. */
  reviews: number
  /** Число проведённых сессий. */
  sessions: number
  subject: Exclude<MentorSubject, 'all'>
  /** Подпись направления в карточке, например «Публичная политика». */
  subjectLabel: string
  tags: readonly string[]
}>

export type MentorReview = Readonly<{ author: string; text: string }>

// Направление консультаций; all — фильтр «Все».
export type MentorSubject = 'all' | 'biz' | 'it' | 'law' | 'med'
