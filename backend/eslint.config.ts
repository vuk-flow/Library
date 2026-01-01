import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const eslintConfig = defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      globals: globals.node,
    },
  },
  // Override default ignores
  globalIgnores(['dist/**', 'node_modules/**']),
  {
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      '@typescript-eslint/no-empty-object-type': 'off',
      // "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      // "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    },
  },
]);

export default eslintConfig;
