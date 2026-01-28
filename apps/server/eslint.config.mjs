import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default tseslint.config(
  {
    ignores: ['dist', 'plop'],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{js,ts}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    settings: { react: { version: '18.3' } },
    rules: {
      'no-console': 'error',
      'no-duplicate-imports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Side effect imports.
            ['^\\u0000'],
            ['^@?\\w.*\\u0000$', '^[^.].*\\u0000$', '^\\..*\\u0000$'],
            ['^@?\\w', '^\\u0000'],
            // Absolute imports and other imports such as Vue-style `@/foo`.
            ['^'],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // style less,scss,css
            ['^.+\\.less$', '^.+\\.s?css$'],
          ],
        },
      ],
    },
  },
);
