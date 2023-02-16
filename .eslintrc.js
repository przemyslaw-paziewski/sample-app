module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json'],
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [
          { pattern: 'next*', group: 'builtin', position: 'before' },
          { pattern: 'next/*', group: 'builtin', position: 'before' },
          { pattern: 'react*', group: 'builtin', position: 'before' },
          { pattern: '@/**', group: 'external', position: 'after' },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'import/default': 'off',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-throw-literal': 'off',
    quotes: ['error', 'single', { avoidEscape: true }],
  },
}
