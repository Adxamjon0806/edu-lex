import { test as baseTest } from 'vitest'

import { worker } from './browser'

// test для browser-тестов (https://mswjs.io/guides/integrations/vitest). Фикстуры auto работают и в тестах,
// которые их не используют.
export const test = baseTest
  // Запускаем MSW один раз на файл: повторный worker.start() в MSW 3 выбрасывает ошибку.
  // worker.stop() не вызываем: MSW не советует, сеть и так изолирована страницей теста.
  .extend('worker', { auto: true, scope: 'file' }, async () => {
    await worker.start({
      // Запрос без хендлера падает с ошибкой, а не уходит в настоящую сеть
      // (в MSW 3 — onUnhandledFrame вместо onUnhandledRequest).
      onUnhandledFrame: 'error',
      // Не выводим служебные сообщения MSW при запуске.
      quiet: true,
    })
    return worker
  })
  // После каждого теста убираем хендлеры, добавленные через worker.use, чтобы они не влияли на следующие тесты.
  .extend('resetHandlers', { auto: true }, ({ worker }, { onCleanup }) => {
    onCleanup(() => {
      worker.resetHandlers()
    })
  })
