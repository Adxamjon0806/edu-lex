# Правила для ИИ-агентов

## Общее

- Пакетный менеджер — pnpm (`pnpm install`, `pnpm <скрипт>`), не npm и не yarn.
- Ориентир — официальная документация инструментов для установленных версий (`node_modules`, `pnpm-lock.yaml`), а не память или примеры для старых версий.
- Код раскладывается по слоям Feature-Sliced Design (`app`, `pages`, `widgets`, `features`, `entities`, `shared`; `src/mocks` — моки для тестов, вне слоёв), импорты из других слоёв — через алиас `~/`. Архитектуру проверяет `pnpm arch:check`.
- `src/app/router/generatedRouteTree.ts` не правь вручную: его генерирует `pnpm routes:generate` (входит в `pnpm types:check`). После изменения маршрутов добавляй его в коммит, иначе pre-commit заблокирует коммит.
- Переменные окружения (`VITE_*`) объявляй в `src/app/declarations/vite/client.d.ts` и добавляй в `.env.example`; наличие обязательных проверяй в `vite.config.ts` (через `loadEnv`), а не в коде приложения: там ошибка дала бы пустую страницу. `.env` не хранится в репозитории: на свежем клоне скопируй `.env.example` в `.env`.
- CI — GitLab (`.gitlab-ci.yml`). Обновляя `playwright`, меняй и тег образа `mcr.microsoft.com/playwright` в задании `test` на ту же версию: в образе только браузеры своей версии.
- Перед завершением задачи запускай `pnpm check` (ESLint, Prettier, типы, архитектура, тесты); автоисправление линта и форматирования — `pnpm fix`. Если после `eslint --fix` остались ошибки, форматирование не запускается: исправь их и повтори `pnpm fix`.
- Сообщения коммитов — по Conventional Commits: `type(scope): subject`, строки до 100 символов (проверяет commitlint).
- Шаблон заранее настроен для того, что понадобится каждому проекту на его основе, даже если таких файлов пока нет: XML и `.env` в редакторе, JSON5 в ESLint, фикстуры Vitest, browser-тесты (`optimizeDeps.include`). Это не избыточность, не удаляй такие настройки. Исключения сортировки под это правило не подпадают (см. «Сортировка в конфигурациях»).
- В компонентах React ставь хук рядом с кодом, который его использует: хук вместе с его `useEffect` или обработчиком, следующий хук — ближе к месту использования, а не все хуки в начале компонента. Порядок вызова хуков при этом не должен зависеть от условий (правила хуков React).
- Комментарии пиши по-русски. В `eslint.config.js`, `vite.config.ts` и `tsconfig*.json` помечай «Дополнение:» всё, чего нет в шаблоне Vite React + TypeScript.

## Тесты (Vitest)

- Запускай тесты командой `pnpm test:run` (или `pnpm vitest run <путь>`), а не `pnpm test`: без флага run Vitest может остаться в режиме watch.
- `pnpm test:run` не устанавливает браузер: если browser-тесты падают из-за отсутствующего Chromium, выполни `pnpm browsers:install` (`pnpm check` делает это сам).
- Тест лежит рядом с тестируемым файлом. Образец стиля — `src/shared/lib/classNames.test.ts`.
- `*.test.{ts,tsx}` выполняется в Node.js без DOM. Тест, которому нужен DOM, называй `*.browser.test.{ts,tsx}`: он выполняется в настоящем Chromium (Browser Mode), jsdom и Testing Library в проекте нет.

### Как писать тесты

- Проверяй поведение, которое видит пользователь или вызывающий код, а не детали реализации (внутреннее состояние, приватные функции, CSS-классы). Название теста — коротко о поведении: `shows error when email is invalid`.
- Покрывай граничные случаи: пустые значения, `null`/`undefined`, границы диапазонов, пустые списки, ошибки и неуспешные запросы. Однотипные случаи с разными данными — через `test.for`.
- Не мокай лишнего: мокай только внешние границы (сеть — через MSW, время, браузерные API), а собственный код проекта — только когда без этого тест не написать.

### Моки

- Перед каждым тестом моки сбрасываются (`mockReset`), поэтому в фабрике `vi.mock` задавай реализацию через `vi.fn(() => value)`, а не `.mockReturnValue(value)`: иначе тест получит `undefined`.
- Восстанавливать вручную ничего не нужно: перед каждым тестом сбрасываются шпионы `vi.spyOn` и подмены `vi.stubEnv` и `vi.stubGlobal`, после каждого — `vi.useFakeTimers` и `vi.setSystemTime`. В `afterEach` подмены последнего теста ещё действуют, в `afterAll` — все, кроме таймеров.

### Browser-тесты

- `test` импортируй из `~/mocks/test-extend`, а не из `vitest`: его фикстура запускает MSW.
- Рендери через `render` из `vitest-browser-react` (асинхронный, нужен `await`), ищи элементы локаторами `screen.getBy*` (предпочтительно `getByRole`) и проверяй их через `await expect.element(...)` — эта проверка сама повторяется, пока условие не выполнится.
- Действия выполняй методами локатора (`click`, `fill`) или через `userEvent` из `vitest/browser`, а не через `@testing-library/user-event`. Для интерактивных элементов проверяй и работу с клавиатуры (`userEvent.tab`, `userEvent.keyboard`) и фокус.
- Хук тестируй через небольшой тестовый компонент и `render`, а не через `renderHook`.
- Компоненты рендерятся в `StrictMode`: в тестах React, как и в разработке, вызывает эффекты дважды.
- В Vitest 5 текст сравнивается точно: `getByText('Save')` не найдёт «Save changes», `toHaveTextContent` требует полного совпадения и не принимает RegExp. Для части текста — `getByText('Save', { exact: false })` и `toMatchTextContent`.
- `vi.spyOn` на импортированный модуль (`import * as mod`) в браузере выбрасывает ошибку; используй `vi.mock(import('./module'), { spy: true })`.
- Если первый запуск нового теста падает с `Vite unexpectedly reloaded a test` после строки `dependency optimized: <пакет>` (или `dependencies optimized: <пакеты>`), это не ошибка теста: добавь пакет в `optimizeDeps.include` browser-проекта в `vite.config.ts`.

```tsx
import { http, HttpResponse } from 'msw'
import { expect } from 'vitest'
import { render } from 'vitest-browser-react'

import { test } from '~/mocks/test-extend'

test('shows error when loading fails', async ({ worker }) => {
  worker.use(http.get('/api/user', () => HttpResponse.json(null, { status: 500 })))
  const screen = await render(<UserCard />)
  await expect.element(screen.getByRole('alert')).toHaveTextContent('Failed to load')
})
```

### Запросы к API (MSW 3)

- Запросы мокаем через MSW, а не подменой `fetch`. Общие успешные ответы — в `src/mocks/handlers.ts`; ответ для отдельного теста подменяй в тесте: `server.use(...)` из `~/mocks/node` в unit-тестах, `worker.use(...)` из контекста теста в browser-тестах. После каждого теста эти подмены сбрасываются.
- Запрос без хендлера — ошибка: в unit-тесте `fetch` отклоняется, в browser-тесте возвращается ответ 500, а в выводе появляется `[MSW] Error: intercepted a request without a matching request handler`. Добавь хендлер, а не ослабляй проверку.
- В Node.js `fetch` принимает только абсолютный URL: относительный (`/api/user`) падает с `Failed to parse URL` ещё до MSW. Код с относительными запросами тестируй в browser-тесте.
- В MSW 3 опция называется `onUnhandledFrame`; `onUnhandledRequest` из примеров для MSW 2 молча игнорируется.

## Сортировка в конфигурациях

- Ключи объектов, union-типы и другие конструкции JS/TS сортирует Perfectionist, импорты — `@ianvs/prettier-plugin-sort-imports`, классы Tailwind — `prettier-plugin-tailwindcss`; их вручную не переставляй.
- Порядок ключей и значений массивов в JSON и YAML, а также массивов из литералов в `*.config.{js,ts}` проверяет ESLint (`jsonc/sort-*`, `yml/sort-*`, `perfectionist/sort-arrays`). После правки конфигурации запускай `pnpm lint` (исправление — `pnpm lint:fix`).
- Места, где порядок задан не алфавитом, перечислены в `eslint.config.js` с причинами: верхний уровень `package.json`, блоки `compilerOptions`, массивы `compilerOptions.paths`, `extends`, `importOrder`, `plugins`, `setupFiles`, `lint-staged.config.js` и команды `before_script` и `script` в `.gitlab-ci.yml`. Исключение есть только для того, что уже есть в проекте (даже если в массиве пока один элемент): новое место добавляй в исключения вместе с ним (не заранее и не отключением правила, иначе `pnpm lint:fix` молча переставит элементы), а исключение для удалённого места убирай.
- Комментарии разрешены только в `tsconfig*.json`, `.vscode/*.json`, `*.jsonc` и `*.json5` (в JSON5 разрешён и остальной его синтаксис); остальные JSON (`package.json`, `tsr.config.json`) читаются как строгий JSON.
- Остальное автоматически не проверяется, держи его по алфавиту сам: массивы с вызовами функций, объектами, переменными или шаблонными строками в JS/TS-конфигах (если порядок в них не важен), массивы объектов в JSON (например, `references` в `tsconfig.json`), ключи `.editorconfig`, строки `.gitignore` и `.prettierignore`. Добавляя элемент, ставь его на место по алфавиту, а не в конец.
- Среди непроверяемого не сортируй то, где порядок меняет поведение: массив конфигов и `extends` в `eslint.config.js` (prettier-конфиги в конце), `plugins` в `vite.config.ts` (`tanstackRouter()` перед `react()`), команды в `.husky/*`, `rules` в `.gitlab-ci.yml` (проверяются сверху вниз до первого совпадения), секции `.editorconfig`, отрицания `!` в `.gitignore` (сразу после шаблона, который отменяют).
- Порядок по договорённости: `codeSplitting.groups` в `vite.config.ts` — по убыванию `priority`; группы `.gitignore` под комментариями — по первому шаблону группы.
- Если порядок важен, но это не очевидно, поясни это комментарием рядом.
