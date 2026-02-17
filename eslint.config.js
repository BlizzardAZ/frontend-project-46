import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'
import jest from 'eslint-plugin-jest' // Не забудьте импортировать плагин

export default defineConfig([
  js.configs.recommended, // Базовые правила
  stylistic.configs.recommended, // Стилистические правила
  {
    // Общие настройки для всех JS файлов
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  {
    // Специфич настройки для тестов
    files: ['**/__tests__/**/*', '**/*.{spec,test}.{js,mjs,cjs}'],
    // Готовый конфиг для Jest
    ...jest.configs['flat/recommended'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
])
