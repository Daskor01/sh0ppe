import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigPrettier from 'eslint-config-prettier'

export default withNuxt({
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-restricted-imports': [
      'warn',
      {
        patterns: [
          {
            group: ['../*', '../**'],
            message: 'Используй абсолютные пути через ~/',
          },
        ],
      },
    ],
  },
}).append(eslintConfigPrettier)
