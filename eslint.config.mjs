import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [{
  ignores: ['**/node_modules', '**/dist', '**/build', '**/*.test.js', '**/*.js'],
}, ...compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended'), {
  plugins: {
    '@typescript-eslint': typescriptEslint,
  },

  languageOptions: {
    parser: tsParser,
    ecmaVersion: 'latest',
    sourceType: 'module',

    parserOptions: {
      project: './tsconfig.json',
    },
  },

  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    indent: ['error', 2],
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-explicit-any': ['error'],
    '@typescript-eslint/no-empty-function': ['error'],
    '@typescript-eslint/no-empty-interface': ['error'],
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/consistent-type-exports': 'error',

    '@typescript-eslint/member-ordering': ['error', {
      default: ['signature', 'method', 'constructor', 'field'],
    }],

    '@typescript-eslint/method-signature-style': 'error',
  },
}];