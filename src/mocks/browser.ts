import { setupWorker } from 'msw/browser'

import { handlers } from './handlers'

// Перехватываем запросы в browser-тестах через Service Worker; запуск и сброс — в test-extend.ts.
export const worker = setupWorker(...handlers)
