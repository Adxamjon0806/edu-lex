// Время отправки сообщения «ЧЧ:ММ».
export function formatMessageTime(date: Date) {
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}

// Оставшееся время «ММ:СС», например 2847 → «47:27».
export function formatRemaining(seconds: number) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0')
  const rest = String(seconds % 60).padStart(2, '0')
  return `${minutes}:${rest}`
}
