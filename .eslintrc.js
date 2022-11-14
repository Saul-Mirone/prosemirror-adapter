/* Copyright 2021, Prosemirror Adapter by Mirone. */

module.exports = {
  extends: [
    '@antfu/eslint-config-ts',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['header', 'eslint-plugin-tsdoc'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',

    'tsdoc/syntax': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['**/vue/**/*.tsx'],
      rules: {
        'react-hooks/rules-of-hooks': 'off',
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
