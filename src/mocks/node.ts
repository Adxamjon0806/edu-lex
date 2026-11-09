import { setupServer } from 'msw/node'

import { handlers } from './handlers'

// Перехватываем запросы в unit-тестах (Node.js); запуск и сброс — в vitest.unit.setup.ts.
export const server = setupServer(...handlers)
