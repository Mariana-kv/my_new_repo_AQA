// @ts-check
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright'

export default defineConfig(
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
            allowDefaultProject: ["eslint.config.mjs"],
        },
      },
    },
  },
  {
    rules: {
        "@typescript-eslint/no-explicit-any": 'warn',
        "@typescript-eslint/no-floating-promises": "error"
    }
  },
  {
    files: ['tests/**'],
    extends: [playwright.configs['flat/recommended']],
    rules: {
      // Customize Playwright rules
      // ...
    },
  },
);