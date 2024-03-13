import { defineConfig } from 'eslint-config-rakko'

export default defineConfig({
  ignores: [
    'tests/fixtures/**/snapshot.*',
  ],
  typescript: {
    project: ['./tsconfig.json', './tests/tsconfig.json'],
  },
  react: true,
})
