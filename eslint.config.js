/* Copyright 2021, Prosemirror Adapter by Mirone. */

const antfu = require('@antfu/eslint-config').default
const header = require('eslint-plugin-header')
const react = require('eslint-plugin-react')
const hooks = require('eslint-plugin-react-hooks')

module.exports = antfu(
  {
    stylistic: true,
    markdown: false,
    typescript: {
      tsconfigPath: 'tsconfig.json',
    },
    ignores: [
      '.idea',
      '**/lib',
      '**/.svelte-kit',
      'CHANGELOG.md',
    ],
    overrides: {
      typescript: {
        'ts/no-unsafe-assignment': 'off',
        'ts/no-unsafe-member-access': 'off',
        'ts/no-unsafe-argument': 'off',
        'ts/no-unsafe-call': 'off',
        'ts/no-unsafe-return': 'off',
        'ts/unbound-method': 'off',
        'ts/ban-types': 'off',
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      header,
    },
    rules: {
      'header/header': ['error', 'block', ' Copyright 2021, Prosemirror Adapter by Mirone. '],
    },
  },
  {
    files: ['**/react/**/*.tsx', '**/react/**/*.ts'],
    plugins: {
      'react': react,
      'react-hooks': hooks,
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
