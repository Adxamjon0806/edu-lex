import type { AuthMethod } from '../config/onboarding'

// Скрывает почту или телефон на шаге подтверждения, как в прототипе: na•••@mail.com, +998 •• ••• 45 67.
export function maskIdentifier(identifier: string, method: AuthMethod): string {
  if (method === 'email') {
    const [user = '', domain] = identifier.split('@')
    return domain ? `${user.slice(0, 2)}•••@${domain}` : identifier || 'вашу почту'
  }
  const digits = identifier.replaceAll(/\D/g, '')
  return digits.length >= 4 ? `+998 •• ••• ${digits.slice(-4, -2)} ${digits.slice(-2)}` : identifier || 'ваш номер'
}
