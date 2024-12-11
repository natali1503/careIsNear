import * as typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import * as typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';

export const eslintConfig = [
  {
    files: ['**/*.ts', '**/*.tsx'], // Specify file patterns for TypeScript files
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      prettier: prettierPlugin,
      import: importPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
      },
    },
    rules: {
      ...typescriptEslintPlugin.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,

      // Custom rules
      'import/no-unresolved': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_', // Игнорировать переменные, начинающиеся с "_"
          argsIgnorePattern: '^_', // Игнорировать параметры функций, начинающиеся с "_"
          argsIgnorePattern: 'e', // Игнорировать параметры функций, начинающиеся с "_"
        },
      ],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'], // добавьте все используемые расширения
        },
      },
    },
  },
];

export default eslintConfig;

// import pkg from '@eslint/js';
// import importPlugin from 'eslint-plugin-import';
// import prettierPlugin from 'eslint-plugin-prettier';
// import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
// import tsEslintParser from '@typescript-eslint/parser';

// const { configs: eslintRecommended } = pkg;

// export default [
//   eslintRecommended.recommended, // Подключение стандартных правил ESLint
//   {
//     files: ['**/*.{js,jsx,ts,tsx}'],
//     languageOptions: {
//       parser: tsEslintParser,
//       ecmaVersion: 2021,
//       sourceType: 'module',
//     },
//     plugins: {
//       '@typescript-eslint': tsEslintPlugin,
//       import: importPlugin,
//       prettier: prettierPlugin,
//     },
//     rules: {
//       ...importPlugin.configs.recommended.rules,
//       ...tsEslintPlugin.configs.recommended.rules,
//       'prettier/prettier': 'warn',
//       'import/order': [
//         'warn',
//         {
//           groups: [
//             ['builtin', 'external'],
//             ['internal'],
//             ['parent', 'sibling'],
//             ['index'],
//           ],
//           alphabetize: {
//             order: 'desc',
//             caseInsensitive: true,
//           },
//           'newlines-between': 'never',
//         },
//       ],
//     },
//   },
// ];
