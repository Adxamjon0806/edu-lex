// Типы переменных окружения (https://vite.dev/guide/env-and-mode#intellisense-for-typescript).
// Файл без импортов: так он дополняет глобальные интерфейсы из vite/client, а не объявляет модуль.

// Наличие переменных проверяет vite.config.ts: без них dev-сервер, сборка и тесты не запускаются.
interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

// Запрещаем обращаться к необъявленным переменным: без этого import.meta.env.ЛЮБОЕ_ИМЯ имеет тип any.
interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}
