import fsd from '@feature-sliced/steiger-plugin'
import { defineConfig } from 'steiger'

// Проверяем структуру проекта по рекомендованным правилам Feature-Sliced Design.
export default defineConfig([
  ...fsd.configs.recommended,
  {
    // Компоненты shared/ui раскладываются по сегментам, как слайсы (button/ui, button/lib), — договорённость
    // проекта. Для Steiger shared/ui сам сегмент, и папки ui/lib внутри него он считает путаницей.
    files: ['./src/shared/ui/**'],
    rules: {
      'fsd/no-reserved-folder-names': 'off',
    },
  },
])
