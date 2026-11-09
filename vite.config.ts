/// <reference types="vitest/config" />
// Дополнение: ссылка на типы Vitest добавляет в defineConfig из vite поле test: Vitest читает настройки тестов
// из этого же файла, поэтому тесты используют те же плагины и алиасы, что и приложение.
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { msw } from 'msw/vite'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
// Основа — конфигурация шаблона Vite React + TypeScript (plugins: [react()]).
// Пометка «Дополнение:» означает, что этого нет в шаблоне; комментарии без пометки описывают настройки из шаблона.
// Дополнение: конфигурация задана функцией, чтобы получить mode и проверить переменные окружения.
export default defineConfig(({ mode }) => {
  // Дополнение: проверяем обязательные переменные окружения до запуска (pnpm dev, pnpm build, Vitest).
  // Vite подставляет import.meta.env.VITE_* в код при сборке, поэтому без переменной приложение упало бы
  // в браузере ещё до рендера, с пустой страницей. loadEnv читает .env-файлы режима и переменные окружения
  // процесса (https://vite.dev/guide/api-javascript#loadenv). Пустая строка допустима: запросы идут
  // на тот же origin, например через proxy dev-сервера.
  const env = loadEnv(mode, process.cwd())

  if (!('VITE_API_URL' in env)) {
    throw new Error('VITE_API_URL is not set: copy .env.example to .env and fill in the values')
  }

  return {
    // Дополнение: задаём, как Rolldown делит сборку на чанки.
    build: {
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              // Отделяем React и React DOM от остальных зависимостей, чтобы общий vendor не забирал эти модули.
              {
                name: 'react-vendor',
                // Более высокий приоритет назначает совпавшим модулям группу React раньше общей vendor-группы.
                priority: 20,
                // Ограничиваем совпадение пакетами react и react-dom, не захватывая пакеты с похожим префиксом.
                test: /node_modules[\\/]react(?:-dom)?(?:[\\/]|$)/,
              },
              // Помещаем в общий vendor-чанк зависимости из node_modules, нужные при первой загрузке страницы.
              {
                name: 'vendor',
                // Приоритет ниже специализированных групп оставляет их совпадениям преимущество.
                priority: 10,
                // Берём только модули, которые статически импортирует точка входа приложения или её зависимости:
                // зависимости, нужные лишь ленивым маршрутам, остаются в их чанках и не грузятся на каждой странице.
                tags: ['$initial'],
                test: /node_modules/,
              },
              // Выносим в общий чанк модули, которые используют несколько точек входа, включая чанки маршрутов.
              {
                // Требуем, чтобы модуль использовали как минимум две точки входа.
                minShareCount: 2,
                // Не создаём общий чанк для модулей суммарным размером меньше 10 КБ.
                minSize: 10000,
                name: 'common',
                // Более низкий приоритет оставляет специализированные группы выше общей группы common.
                priority: 5,
              },
            ],
          },
        },
      },
    },
    plugins: [
      // Дополнение: генерируем дерево маршрутов и делим маршруты на чанки. Плагин должен стоять перед react(),
      // иначе разделение маршрутов на чанки не сработает.
      // Пути маршрутов плагин берёт из tsr.config.json, общего с CLI `tsr generate` (pnpm routes:generate).
      // JSON не поддерживает комментарии, поэтому поясняем здесь:
      // - routesDirectory: файловые маршруты лежат в слое app (src/app/routes), а не в src/routes по умолчанию;
      // - generatedRouteTree: дерево маршрутов генерируется рядом с конфигурацией роутера в src/app/router.
      tanstackRouter({
        // Выносим компоненты маршрутов в отдельные чанки, которые загружаются при переходе.
        autoCodeSplitting: true,
      }),
      // Компилируем JSX и включаем Fast Refresh для React.
      react(),
      // Дополнение: подключаем Tailwind CSS v4 через Vite-плагин.
      tailwindcss(),
    ],
    // Дополнение: порт pnpm preview совпадает с dev-сервером.
    preview: {
      port: 3000,
    },
    resolve: {
      // Дополнение: берём алиасы из paths в tsconfig, чтобы не дублировать их здесь.
      tsconfigPaths: true,
    },
    // Дополнение: запускаем dev-сервер на порту 3000. Доступен только с этой машины (localhost);
    // для доступа из сети — pnpm dev --host.
    server: {
      port: 3000,
    },
    // Дополнение: настройки Vitest.
    test: {
      coverage: {
        // Не учитываем в покрытии объявления типов и сгенерированное дерево маршрутов; файлы тестов Vitest исключает сам.
        exclude: [
          'src/**/*.d.ts',
          'src/app/router/generatedRouteTree.ts',
          // Плагин TanStack преобразует объявления файловых маршрутов;
          // ветки V8 в сгенерированной обёртке не сопоставлены с исходниками.
          'src/app/routes/**/*.tsx',
          // Моки API нужны только тестам.
          'src/mocks/**',
        ],
        // Считаем покрытие по всем исходникам, а не только по импортированным в тестах, чтобы видеть непокрытые файлы.
        include: ['src/**/*.{ts,tsx}'],
      },
      // Перед каждым тестом сбрасываем моки до реализации, переданной в vi.fn(impl), чтобы mockReturnValue
      // из одного теста не влиял на следующие: restoreMocks касается только vi.spyOn,
      // а clearMocks — только истории вызовов. Сбрасываются и mockReturnValue/mockImplementation,
      // заданные в фабрике vi.mock: там реализацию передаём в vi.fn(() => …).
      mockReset: true,
      // Два набора тестов; оба наследуют плагины, алиасы и общие настройки test из этого файла.
      projects: [
        {
          // Заранее собираем зависимости для браузера. Иначе, если кэш Vite уже есть, а новый тест импортирует
          // зависимость впервые, Vite пересобирает её и перезагружает страницу: первый запуск теста падает
          // с «Vite unexpectedly reloaded a test». Такие зависимости добавляем сюда.
          // vitest-browser-react указан явно: setup-файл импортирует только vitest-browser-react/pure,
          // а render из основного входа нужен почти каждому тесту.
          optimizeDeps: {
            include: ['@tanstack/react-router', 'clsx', 'tailwind-merge', 'vitest-browser-react'],
          },
          // Отдаём браузеру скрипт Service Worker для MSW без копии в public, поэтому в сборку приложения он не попадает.
          // worker-only: worker создаём сами через setupWorker (src/mocks/browser.ts).
          plugins: [msw({ mode: 'worker-only' })],
          test: {
            // Компоненты рендерим в настоящем Chromium через Playwright, а не в эмуляции DOM.
            browser: {
              enabled: true,
              // Без окна браузера: по умолчанию headless включён только в CI,
              // а локально, в pre-commit и у ИИ-агента окно мешает.
              headless: true,
              instances: [{ browser: 'chromium' }],
              provider: playwright(),
              // Скриншоты page.screenshot() сохраняем в игнорируемый git каталог, а не в __screenshots__ рядом с тестом:
              // там лежат эталоны toMatchScreenshot, которые хранятся в репозитории. Скриншоты упавших тестов
              // Vitest сам кладёт в attachmentsDir (.vitest/attachments), эта опция на них не влияет.
              screenshotDirectory: '.vitest/screenshots',
            },
            // Сюда попадают только тесты с суффиксом .browser.test.
            include: ['src/**/*.browser.test.{ts,tsx}'],
            name: 'browser',
            // Включаем StrictMode для render из vitest-browser-react.
            setupFiles: ['./vitest.browser.setup.ts'],
          },
        },
        {
          test: {
            // Тесты браузерного набора сюда не попадают.
            exclude: ['src/**/*.browser.test.{ts,tsx}'],
            // Логика без DOM (функции, сторы, мапперы) быстро выполняется в Node.js.
            include: ['src/**/*.test.{ts,tsx}'],
            name: 'unit',
            // Подключаем MSW для запросов из unit-тестов.
            setupFiles: ['./vitest.unit.setup.ts'],
          },
        },
      ],
      // Перед каждым тестом снимаем шпионы vi.spyOn, чтобы они не влияли на следующие тесты.
      restoreMocks: true,
      // Общий setup обоих наборов: setupFiles наборов выполняются после него. Сбрасывает фальшивые таймеры.
      setupFiles: ['./vitest.setup.ts'],
      // Перед каждым тестом сбрасываем подмены vi.stubEnv.
      unstubEnvs: true,
      // Перед каждым тестом сбрасываем подмены vi.stubGlobal.
      unstubGlobals: true,
    },
  }
})
