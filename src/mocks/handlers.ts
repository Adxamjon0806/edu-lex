import type { AnyHandler } from 'msw'

// Общие хендлеры успешных ответов API: с ними работают все тесты. Ответ для отдельного теста
// подменяем в самом тесте через server.use / worker.use.
export const handlers: AnyHandler[] = []
