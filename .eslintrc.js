/* Copyright 2021, Prosemirror Adapter by Mirone. */

module.exports = {
  extends: [
    '@antfu',
  ],
  plugins: ['header'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: [
    'lib',
  ],
  overrides: [
    {
      files: ['**/react/**/*.tsx', '**/react/**/*.ts'],
      extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
      ],
      rules: {
        'jsx-quotes': [
          'error',
          'prefer-double',
        ],
        'react/react-in-jsx-scope': 'off',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.js'],
      rules: {
        'header/header': ['error', 'block', ' Copyright 2021, Prosemirror Adapter by Mirone. '],
      },
    },
  ],
}
