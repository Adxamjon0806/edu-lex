import { afterEach, vi } from 'vitest'

// vi.useFakeTimers и vi.setSystemTime действуют до вызова vi.useRealTimers, а опции конфига для их сброса нет
// (https://vitest.dev/guide/mocking): возвращаем настоящие таймеры и дату после каждого теста.
afterEach(() => {
  vi.useRealTimers()
})
