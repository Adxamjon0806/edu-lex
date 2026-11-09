// Оценка надёжности пароля из прототипа: 0 — пусто, 1–4 — за длину от 8 символов, буквы, цифры и спецсимволы.
export function getPasswordScore(password: string): number {
  if (!password) return 0
  const checks = [
    password.length >= 8,
    /[A-Za-zА-Яа-я]/.test(password),
    /\d/.test(password),
    /[^A-Za-zА-Яа-я0-9]/.test(password),
  ]
  const passed = checks.filter(Boolean).length
  return Math.min(4, Math.max(1, passed))
}

export const PASSWORD_HINTS = [
  'Минимум 8 символов: буквы и цифры',
  'Слабый пароль',
  'Средний пароль',
  'Хороший пароль',
  'Надёжный пароль',
] as const

// Цвет заполненных полосок по оценке (из макета): 1 — red-300, 2 — gold, 3 — emerald-500, 4 — emerald.
export const PASSWORD_BAR_CLASSES = ['bg-track', 'bg-red-300', 'bg-gold', 'bg-emerald-500', 'bg-emerald'] as const
