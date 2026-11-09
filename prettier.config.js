// LF, два пробела, пробельные отступы и перевод строки в конце уже совпадают с EditorConfig.
// printWidth и переопределение для Markdown повторяют EditorConfig намеренно: CLI Prettier и расширение VS Code
// читают .editorconfig, а API Prettier (resolveConfig) — только с опцией editorconfig: true.
/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  // Группируем импорты по внешним пакетам и слоям проекта; '' отделяет группы пустой строкой.
  // Встроенные модули Node.js (node:path и т. п.) плагин сам ставит первыми, до этих групп.
  importOrder: [
    // React идёт перед остальными внешними зависимостями.
    '^(react(/.*)?)$',
    '^(react-dom(/.*)?)$',
    '',
    // Остальные внешние пакеты держим отдельной группой.
    '<THIRD_PARTY_MODULES>',
    '',
    // Алиасы идут сверху вниз по слоям проекта.
    '^~/app/(.*)$',
    '',
    '^~/pages/(.*)$',
    '',
    '^~/widgets/(.*)$',
    '',
    '^~/features/(.*)$',
    '',
    '^~/entities/(.*)$',
    '',
    '^~/shared/(.*)$',
    '',
    // Моки API для тестов — вне слоёв, ниже всех.
    '^~/mocks/(.*)$',
    '',
    // Относительные импорты размещаем последними.
    '^[.]',
  ],
  // Версия TypeScript проекта: начиная с 4.5.0 плагин объединяет импорты типов и значений из одного модуля
  // (import { type A, b }). При обновлении TypeScript менять не нужно: важен только этот порог.
  importOrderTypeScriptVersion: '6.0.0',
  // Переопределяем общую ширину только для Markdown.
  overrides: [
    {
      // Совпадает с секцией [*.md] в EditorConfig.
      files: '*.md',
      options: {
        // Не переносим строки по ширине, как max_line_length = off в EditorConfig.
        printWidth: Infinity,
      },
    },
  ],
  // Сортируем импорты и классы Tailwind при форматировании.
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  // Совпадает с max_line_length = 120 в EditorConfig.
  printWidth: 120,
  // Опускаем точки с запятой в конце инструкций для единого стиля кода.
  semi: false,
  // Используем одинарные кавычки в JS/TS, CSS и YAML для единого стиля кода.
  singleQuote: true,
  // Сортируем классы Tailwind внутри вызовов classNames().
  tailwindFunctions: ['classNames'],
  // Берём тему и утилиты Tailwind v4 из входного CSS файла проекта.
  tailwindStylesheet: './src/app/styles/index.css',
}
