import antfu from '@antfu/eslint-config'
import { fixupPluginRules } from '@eslint/compat'
import react from 'eslint-plugin-react'
import hooks from 'eslint-plugin-react-hooks'

export default antfu(
  {
    stylistic: true,
    markdown: false,
    ignores: [
      '.idea',
      '**/lib',
      '**/.svelte-kit',
      'CHANGELOG.md',
      'vite.config.ts',
      '**/shim.d.ts',
    ],
    typescript: {
      overrides: {
        'ts/no-unsafe-assignment': 'off',
        'ts/no-unsafe-member-access': 'off',
        'ts/no-unsafe-argument': 'off',
        'ts/no-unsafe-call': 'off',
        'ts/no-unsafe-return': 'off',
        'ts/unbound-method': 'off',
        'ts/ban-types': 'off',
        'ts/strict-boolean-expressions': 'off',
        'unicorn/no-new-array': 'off',
      },
    },
  },
  {
    files: ['**/react/**/*.tsx', '**/react/**/*.ts'],
    plugins: {
      'react': fixupPluginRules(react),
      'react-hooks': fixupPluginRules(hooks),
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...hooks.configs.recommended.rules,
      'jsx-quotes': ['error', 'prefer-double'],
      'react/react-in-jsx-scope': 'off',
    },
  },
)
