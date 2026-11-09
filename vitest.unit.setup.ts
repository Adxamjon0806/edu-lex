import { afterAll, afterEach, beforeAll } from 'vitest'

import { server } from './src/mocks/node'

// Подключаем MSW в unit-тестах (https://vitest.dev/guide/mocking/requests).
// Запрос без хендлера падает с ошибкой, а не уходит в настоящую сеть. В MSW 3 опция называется onUnhandledFrame
// (в документации Vitest — onUnhandledRequest из MSW 2).
beforeAll(() => {
  server.listen({ onUnhandledFrame: 'error' })
})
// Убираем хендлеры, добавленные в тесте через server.use, чтобы они не влияли на следующие тесты.
afterEach(() => {
  server.resetHandlers()
})
afterAll(() => {
  server.close()
})
