import {
  AtSign,
  GraduationCap,
  Mail,
  MailCheck,
  MessageSquareText,
  Phone,
  Presentation,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'

// Тексты и варианты — из экрана «01 Онбординг» бандла.

export type AuthMethod = 'email' | 'phone'
export type AuthMode = 'login' | 'signup'
export type OnboardingStep = 'auth' | 'otp' | 'profile' | 'role'
export type Role = 'student' | 'teacher'

// Номер шага для «Шаг N из 4» и заполнение прогресса.
export const STEP_NUMBER: Readonly<Record<OnboardingStep, number>> = { auth: 2, otp: 3, profile: 4, role: 1 }
export const STEPS_TOTAL = 4

export const ROLES: readonly Readonly<{
  description: string
  en: string
  icon: LucideIcon
  title: string
  value: Role
}>[] = [
  {
    description: 'Персональный трек: направление, целевой вуз и уровень английского.',
    en: 'Student',
    icon: GraduationCap,
    title: 'Студент',
    value: 'student',
  },
  {
    description: 'Верификация профиля, онлайн-консультации и доход на платформе.',
    en: 'Teacher · Consultant',
    icon: Presentation,
    title: 'Преподаватель / Консультант',
    value: 'teacher',
  },
]

export const AUTH_METHODS = [
  { icon: Mail, label: 'Эл. почта', value: 'email' },
  { icon: Smartphone, label: 'Телефон', value: 'phone' },
] as const satisfies readonly Readonly<{ icon: LucideIcon; label: string; value: AuthMethod }>[]

// Всё, что на шагах входа и подтверждения зависит от способа: почта или телефон.
export const AUTH_METHOD_TEXTS = {
  email: {
    autoComplete: 'email',
    changeWhat: 'почту',
    idIcon: AtSign,
    idLabel: 'Электронная почта',
    idPlaceholder: 'name@university.edu',
    idType: 'email',
    otpIcon: MailCheck,
    otpSubtitle: 'Мы отправили 6-значный код на',
    otpTitle: 'Подтвердите почту',
  },
  phone: {
    autoComplete: 'tel',
    changeWhat: 'номер',
    idIcon: Phone,
    idLabel: 'Номер телефона',
    idPlaceholder: '+998 90 123 45 67',
    idType: 'tel',
    otpIcon: MessageSquareText,
    otpSubtitle: 'Мы отправили 6-значный код по SMS на номер',
    otpTitle: 'Подтвердите телефон',
  },
} as const satisfies Record<AuthMethod, unknown>

export const AUTH_MODE_TEXTS = {
  login: {
    passwordPlaceholder: 'Ваш пароль',
    submit: 'Войти',
    subtitle: 'Введите почту или телефон, указанные при регистрации.',
    switchAction: 'Создайте аккаунт',
    switchQuestion: 'Впервые у нас?',
    title: 'Вход в EduLex',
  },
  signup: {
    passwordPlaceholder: 'Придумайте пароль',
    submit: 'Создать аккаунт',
    subtitle: 'Укажите почту или телефон — на них придёт код подтверждения.',
    switchAction: 'Войдите',
    switchQuestion: 'Уже есть аккаунт?',
    title: 'Создайте аккаунт',
  },
} as const satisfies Record<AuthMode, unknown>

export const REGIONS: readonly Readonly<{ label: string; value: string }>[] = [
  { label: 'Великобритания', value: 'uk' },
  { label: 'США', value: 'us' },
  { label: 'Европа', value: 'eu' },
  { label: 'Азия · Сингапур', value: 'asia' },
]

export const LEVELS = [
  { description: 'Intermediate', label: 'B1', value: 'B1' },
  { description: 'Upper-Int.', label: 'B2', value: 'B2' },
  { description: 'Advanced', label: 'C1', value: 'C1' },
  { description: 'Proficient', label: 'C2', value: 'C2' },
] as const

export type Level = (typeof LEVELS)[number]['value']

export const TEACHER_FIELDS: readonly Readonly<{ label: string; value: string }>[] = [
  { label: 'Академическая специализация', value: 'International Commercial Law' },
  { label: 'Образование', value: 'LLM, University of London' },
  { label: 'Опыт преподавания', value: '7 лет' },
  { label: 'Темы консультаций', value: 'Contract Law, IELTS Academic' },
]

// Неактивная основная кнопка на этой странице — серая заливка из макета, а не общий вид disabled у Button.
export const DISABLED_PRIMARY_CLASS_NAME = 'disabled:bg-[#C9C3B5] disabled:opacity-100'

// Значения по умолчанию из состояния прототипа.
export const DEFAULTS = {
  directions: ['law'],
  level: 'C1',
  region: 'uk',
  role: 'student',
} as const satisfies Readonly<{ directions: readonly string[]; level: Level; region: string; role: Role }>
