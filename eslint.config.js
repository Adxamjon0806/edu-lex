import path from 'node:path'

import js from '@eslint/js'
import pluginQuery from '@tanstack/eslint-plugin-query'
import pluginRouter from '@tanstack/eslint-plugin-router'
import vitest from '@vitest/eslint-plugin'
import eslintConfigPrettier from 'eslint-config-prettier'
import jsonc from 'eslint-plugin-jsonc'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import perfectionist from 'eslint-plugin-perfectionist'
import reactDom from 'eslint-plugin-react-dom'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactX from 'eslint-plugin-react-x'
import sonarjs from 'eslint-plugin-sonarjs'
import yml from 'eslint-plugin-yml'
import { defineConfig, globalIgnores, includeIgnoreFile } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

// Дополнение: глобальные объекты, которые есть только в браузере, а в Node.js отсутствуют (document, window и т. п.).
const browserOnlyGlobals = Object.keys(globals.browser).filter((name) => !(name in globals.node))

// Дополнение: в JSON и YAML сортируем ключи и значения массивов в естественном порядке без учёта регистра,
// как Perfectionist в JS/TS.
const sortOrder = { caseSensitive: false, natural: true }
// Дополнение: этот порядок для всех путей файла.
const sortEverywhere = { order: sortOrder, pathPattern: '.*' }

// Основа — ESLint-конфигурация Vite React + TypeScript; ниже добавлены плагины и проверка с учётом типов.
// Пометка «Дополнение:» означает, что этого нет в шаблоне Vite; комментарии без пометки описывают настройки из шаблона.
export default defineConfig([
  // Дополнение: ESLint, в отличие от Prettier, не читает .gitignore сам; исключаем те же файлы
  // (в том числе dist из шаблона Vite и отчёты покрытия Vitest).
  includeIgnoreFile(path.join(import.meta.dirname, '.gitignore')),
  // Дополнение: исключаем генерируемое дерево маршрутов и lockfile (его формат задаёт pnpm), как в .prettierignore.
  globalIgnores(['**/design', '**/generatedRouteTree.ts', 'pnpm-lock.yaml']),
  // Дополнение: базовые правила ESLint применяем ко всем файлам, а не только к TS, чтобы проверялись и JS-конфиги.
  js.configs.recommended,
  {
    // Дополнение: JS-файлы в проекте — конфигурации инструментов, они выполняются в Node.js.
    files: ['**/*.{cjs,js,mjs}'],
    languageOptions: {
      globals: globals.node,
    },
  },
  // Дополнение: Perfectionist сортирует поддерживаемые конструкции в естественном порядке.
  perfectionist.configs['recommended-natural'],
  {
    rules: {
      // Дополнение: Prettier сортирует импорты и в JS, и в TS; отключаем конфликтующие правила для обоих языков.
      'perfectionist/sort-imports': 'off',
      // Дополнение: именованные импорты также сортирует Prettier.
      'perfectionist/sort-named-imports': 'off',
    },
  },
  {
    // Дополнение: ключи lint-staged выполняются по очереди в порядке объявления (см. lint-staged.config.js),
    // поэтому их не сортируем.
    files: ['lint-staged.config.js'],
    rules: {
      'perfectionist/sort-objects': 'off',
    },
  },
  {
    // Дополнение: в конфигурациях инструментов сортируем и элементы массивов; в recommended это правило выключено.
    files: ['*.config.{js,ts}'],
    // Дополнение: команды lint-staged выполняются по порядку, поэтому этот файл не проверяем.
    ignores: ['lint-staged.config.js'],
    rules: {
      'perfectionist/sort-arrays': [
        'error',
        {
          type: 'natural',
          useConfigurationIf: {
            // Дополнение: проверяем только массивы, все элементы которых — литералы (например, строки).
            // Исключаем массивы, где порядок меняет поведение: extends (следующий конфиг переопределяет
            // предыдущий), importOrder (порядок групп импортов), plugins (порядок подключения плагинов;
            // в Prettier prettier-plugin-tailwindcss должен быть последним) и setupFiles (выполняются по порядку).
            matchesAstSelector:
              'ArrayExpression' +
              ':not(:has(> :not(Literal)))' +
              ':not(Property[key.name="extends"] > ArrayExpression)' +
              ':not(Property[key.name="importOrder"] > ArrayExpression)' +
              ':not(Property[key.name="plugins"] > ArrayExpression)' +
              ':not(Property[key.name="setupFiles"] > ArrayExpression)',
          },
        },
      ],
    },
  },
  // Дополнение: проверяем доступность JSX-разметки по рекомендованным правилам jsx-a11y.
  jsxA11y.flatConfigs.recommended,
  // Дополнение: ищем баги, уязвимости и запахи кода по рекомендованным правилам SonarJS.
  sonarjs.configs.recommended,
  // Дополнение: проверяем работу с TanStack Query по строгим рекомендованным правилам: к recommended добавлено
  // prefer-query-options (ключ и функцию запроса описываем вместе через queryOptions/infiniteQueryOptions,
  // а ключ в getQueryData, invalidateQueries и т. п. берём из их результата, а не пишем вручную).
  ...pluginQuery.configs['flat/recommended-strict'],
  // Дополнение: проверяем маршруты по рекомендованным правилам TanStack Router.
  ...pluginRouter.configs['flat/recommended'],
  {
    extends: [
      // Дополнение: вместо шаблонного recommended применяем строгие правила с учётом типов.
      tseslint.configs.strictTypeChecked,
      // Дополнение: проверяем читаемость TypeScript с учётом типов.
      tseslint.configs.stylisticTypeChecked,
      // Проверяем хуки React и зависимости эффектов.
      reactHooks.configs.flat.recommended,
      // Ограничиваем экспорты компонентов для корректной работы Fast Refresh в Vite.
      reactRefresh.configs.vite,
      // Дополнение: проверяем React-компоненты с учётом TypeScript и информации о типах.
      reactX.configs['recommended-type-checked'],
      // Дополнение: проверяем работу с DOM в React.
      reactDom.configs.recommended,
    ],
    // Эти правила применяем только к файлам TypeScript и TSX.
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      // Разрешаем глобальные объекты браузера во всех TS-файлах, включая vite.config.ts:
      // правило no-undef для TypeScript отключено typescript-eslint, необъявленные имена находит tsc.
      globals: globals.browser,
      parserOptions: {
        // Дополнение: для правил с учётом типов каждый файл получает ближайший tsconfig через сервис TypeScript,
        // как в редакторе.
        projectService: true,
        // Дополнение: ищем tsconfig относительно этой конфигурации, независимо от текущего каталога.
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // Дополнение: проверяем тесты по рекомендованным правилам Vitest.
    extends: [vitest.configs.recommended],
    // Дополнение: правила для тестов применяем только к файлам тестов.
    files: ['**/*.test.{ts,tsx}'],
    // Дополнение: правила против ошибок, типичных для тестов, написанных ИИ
    // (https://vitest.dev/guide/learn/writing-tests-with-ai).
    rules: {
      // toBeDefined проходит почти для любого результата и даёт ложную уверенность; проверяем конкретные значения.
      'vitest/no-restricted-matchers': [
        'error',
        { toBeDefined: 'Проверяй конкретное значение (toBe, toStrictEqual, toMatchObject, toBeTypeOf).' },
      ],
      // vi.mock(import('./module')) вместо строкового пути: проверяются путь и типы,
      // переименование файла обновляет мок.
      'vitest/prefer-import-in-mock': 'error',
    },
    settings: {
      vitest: {
        // test из src/mocks/test-extend.ts правила Vitest проверяют так же, как test из vitest.
        vitestImports: [/test-extend$/],
      },
    },
  },
  {
    // Дополнение: если фикстура принимает второй параметр, Vitest требует, чтобы первый был деструктуризацией,
    // даже пустой: ({}, { onCleanup }) => ….
    files: ['**/*.test.{ts,tsx}', 'src/mocks/test-extend.ts'],
    rules: {
      'no-empty-pattern': ['error', { allowObjectPatternsAsParameters: true }],
    },
  },
  {
    // Дополнение: в browser-тестах MSW запускает фикстура из test-extend; с test из vitest запросы ушли бы в сеть.
    files: ['**/*.browser.test.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              importNames: ['it', 'test'],
              message: "В browser-тестах импортируй test из '~/mocks/test-extend': он запускает MSW.",
              name: 'vitest',
            },
          ],
        },
      ],
    },
  },
  {
    // Дополнение: unit-тесты выполняются в Node.js без DOM, а tsc проверяет их с типами DOM из tsconfig.app.json,
    // поэтому обращение к браузерным объектам ловим здесь, а не падением теста при запуске.
    files: ['**/*.test.{ts,tsx}'],
    // Дополнение: browser-тесты выполняются в Chromium, браузерные объекты им доступны.
    ignores: ['**/*.browser.test.{ts,tsx}'],
    rules: {
      // Дополнение: запрещаем браузерные глобальные объекты; тест с DOM должен называться *.browser.test.{ts,tsx}.
      'no-restricted-globals': [
        'error',
        ...browserOnlyGlobals.map((name) => ({
          message: 'В Node.js этого объекта нет: тест с DOM называй *.browser.test.{ts,tsx}.',
          name,
        })),
      ],
    },
  },
  {
    // Дополнение: проверяем JSON по рекомендованным правилам строгого JSON, в том числе без комментариев:
    // package.json и tsr.config.json читаются как строгий JSON.
    extends: [jsonc.configs['recommended-with-json']],
    files: ['**/*.json', '**/*.jsonc'],
  },
  {
    // Дополнение: в JSON5 разрешаем его синтаксис (комментарии, Infinity, шестнадцатеричные числа и т. п.).
    extends: [jsonc.configs['recommended-with-json5']],
    files: ['**/*.json5'],
  },
  // Дополнение: проверяем YAML по рекомендованным правилам.
  yml.configs.recommended,
  {
    // Дополнение: tsconfig и настройки VS Code читаются как JSONC, комментарии в них разрешены.
    files: ['**/*.jsonc', '**/tsconfig*.json', '.vscode/*.json'],
    rules: {
      'jsonc/no-comments': 'off',
    },
  },
  {
    // Дополнение: Perfectionist не проверяет JSON, поэтому порядок ключей и значений массивов в JSON проверяем здесь.
    files: ['**/*.json', '**/*.json5', '**/*.jsonc'],
    rules: {
      'jsonc/sort-array-values': [
        'error',
        {
          order: sortOrder,
          // Дополнение: не сортируем значения compilerOptions.paths: TypeScript перебирает их по порядку.
          pathPattern: String.raw`^(?!compilerOptions\.paths[.[])`,
        },
      ],
      'jsonc/sort-keys': ['error', sortEverywhere],
    },
  },
  {
    // Дополнение: ключи верхнего уровня package.json держим в порядке шаблона Vite (name, private, version, …),
    // вложенные (scripts, dependencies и т. д.) — по алфавиту.
    files: ['package.json'],
    rules: {
      'jsonc/sort-keys': ['error', { order: { type: 'ignore' }, pathPattern: '^$' }, sortEverywhere],
    },
  },
  {
    // Дополнение: compilerOptions разбиты пустыми строками на блоки, как в шаблоне Vite; сортируем внутри блока.
    files: ['**/tsconfig*.json'],
    rules: {
      'jsonc/sort-keys': [
        'error',
        { allowLineSeparatedGroups: true, order: sortOrder, pathPattern: '^compilerOptions$' },
        sortEverywhere,
      ],
    },
  },
  {
    // Дополнение: Perfectionist не проверяет YAML, поэтому порядок ключей и элементов списков в YAML проверяем здесь.
    files: ['**/*.yaml', '**/*.yml'],
    rules: {
      'yml/sort-keys': ['error', sortEverywhere],
      'yml/sort-sequence-values': ['error', sortEverywhere],
    },
  },
  {
    // Дополнение: в .gitlab-ci.yml команды before_script и script выполняются по очереди, поэтому их не сортируем.
    files: ['.gitlab-ci.yml'],
    rules: {
      'yml/sort-sequence-values': [
        'error',
        { order: sortOrder, pathPattern: String.raw`^(?!(?:.+\.)?(?:before_script|script)$)` },
      ],
    },
  },
  // Дополнение: отключаем правила форматирования, которые могут конфликтовать с Prettier.
  eslintConfigPrettier,
  // Дополнение: eslint-config-prettier не знает правил jsonc и yml, поэтому их правила форматирования отключаем
  // prettier-конфигами самих плагинов.
  jsonc.configs.prettier,
  yml.configs.prettier,
])
