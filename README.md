# Template

Шаблон фронтенд-приложения на React и TypeScript. Архитектура — [Feature-Sliced Design](https://feature-sliced.design/).

## Стек

- **Сборка:** [Vite](https://vite.dev/), [TypeScript](https://www.typescriptlang.org/)
- **UI:** [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Маршрутизация:** [TanStack Router](https://tanstack.com/router) (файловые маршруты)
- **Данные:** [TanStack Query](https://tanstack.com/query), [axios](https://axios-http.com/)
- **Тесты:** [Vitest](https://vitest.dev/) (unit в Node.js и browser-тесты в Chromium), [MSW](https://mswjs.io/)
- **Качество кода:** ESLint, Prettier, [Steiger](https://github.com/feature-sliced/steiger) (проверка FSD),
  commitlint, husky, lint-staged

## Требования

- Node.js 24 (версия в `.nvmrc`)
- pnpm 12 ([установка](https://pnpm.io/installation)); точную версию pnpm берёт из поля `packageManager`
  в `package.json`

## Быстрый старт

```sh
pnpm install
cp .env.example .env   # затем заполни значения в .env
pnpm dev               # http://localhost:3000
```

## Переменные окружения

`.env` не хранится в репозитории; список переменных — в `.env.example`. Без обязательных переменных
`pnpm dev`, `pnpm build` и тесты не запускаются и сообщают, какой переменной не хватает.

| Переменная     | Назначение                                                                           |
| -------------- | ------------------------------------------------------------------------------------ |
| `VITE_API_URL` | Базовый адрес API. Пустая строка — запросы на тот же origin (например, через proxy). |

Переменные с префиксом `VITE_` попадают в код приложения и видны в браузере: секреты в них не храни.

## Скрипты

| Команда                 | Что делает                                                            |
| ----------------------- | --------------------------------------------------------------------- |
| `pnpm dev`              | Dev-сервер на порту 3000                                              |
| `pnpm build`            | Проверка типов и сборка в `dist`                                      |
| `pnpm preview`          | Просмотр собранного приложения на порту 3000                          |
| `pnpm check`            | Все проверки: ESLint, Prettier, типы, архитектура, тесты              |
| `pnpm fix`              | Автоисправление ESLint и форматирование Prettier                      |
| `pnpm lint`             | Проверка ESLint                                                       |
| `pnpm lint:fix`         | Автоисправление ESLint                                                |
| `pnpm format`           | Форматирование Prettier                                               |
| `pnpm format:check`     | Проверка форматирования Prettier                                      |
| `pnpm types:check`      | Генерация дерева маршрутов и проверка типов                           |
| `pnpm arch:check`       | Проверка архитектуры FSD (Steiger)                                    |
| `pnpm test`             | Тесты в режиме наблюдения                                             |
| `pnpm test:run`         | Тесты однократно                                                      |
| `pnpm test:coverage`    | Тесты с отчётом покрытия в `coverage`                                 |
| `pnpm browsers:install` | Установка Chromium для browser-тестов (`pnpm check` выполняет её сам) |
| `pnpm routes:generate`  | Генерация дерева маршрутов (входит в `pnpm types:check`)              |

## Структура

```text
src/
  app/       инициализация приложения: точка входа, провайдеры, роутер, маршруты, макеты, стили
  pages/     страницы
  widgets/   крупные самостоятельные блоки страниц
  shared/    переиспользуемый код без бизнес-логики: API-клиент, конфигурация, утилиты
  mocks/     моки API для тестов (MSW)
```

Слои `features` и `entities` добавляются по мере необходимости. Импорты из других слоёв — через алиас `~/`.

## Тесты

- `*.test.ts(x)` выполняются в Node.js без DOM.
- `*.browser.test.ts(x)` выполняются в настоящем Chromium (Vitest Browser Mode).
- Запросы к API в тестах перехватывает MSW.

## Коммиты

Сообщения коммитов — по [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): subject`.
Перед коммитом husky и lint-staged форматируют и проверяют изменённые файлы, commitlint проверяет сообщение.

## CI

Конвейер GitLab CI описан в `.gitlab-ci.yml`: линтинг, тесты с отчётами в merge request, проверка сообщений
коммитов и сборка. Перед первым запуском задай в проекте GitLab переменную `VITE_API_URL`
(Settings → CI/CD → Variables, область окружения «All»): без неё задание сборки остановится.

## Правила разработки

Подробные правила кода, тестов и конфигураций — в [AGENTS.md](AGENTS.md).
