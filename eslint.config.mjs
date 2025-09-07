import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import testingLibrary from 'eslint-plugin-testing-library';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import storybook from 'eslint-plugin-storybook';

export default [
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  jsxA11Y.flatConfigs.recommended,
  testingLibrary.configs['flat/dom'],
  ...tseslint.configs.recommended,
  ...storybook.configs['flat/recommended'],
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    plugins: {
      'react-refresh': reactRefresh,
      'react-hooks': pluginReactHooks,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      'react-refresh/only-export-components': 'warn',
      'import/no-default-export': 'error',

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['sibling', 'parent'],
            'index',
            'object',
            'type',
            'unknown',
          ],

          'newlines-between': 'always',

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      'testing-library/consistent-data-testid': [
        'error',
        {
          testIdPattern: '^([a-z0-9]+-?:?)+$',
        },
      ],
      ...pluginReactHooks.configs.recommended.rules,
    },
  },
];
