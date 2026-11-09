import { configure } from 'vitest-browser-react/pure'

// Рендерим компоненты в StrictMode, как в приложении: React дважды вызывает эффекты и находит
// побочные эффекты без очистки (https://vitest.dev/api/browser/react).
configure({ reactStrictMode: true })
