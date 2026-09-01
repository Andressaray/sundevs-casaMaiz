/* eslint-disable-next-line no-unused-vars */
const js = require("@eslint/js");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const importPlugin = require("eslint-plugin-import");
const prettierPlugin = require("eslint-plugin-prettier");

module.exports = [
  {
    ignores: ["node_modulesESLINT_*.tsx", "__tests__*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: "readonly",
        process: "readonly",
        __DEV__: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      "sort-imports": "off",
      // Regla de ordenamiento de imports desactivada temporalmente por incompatibilidad con ESLint 10
      // Se usará prettier-plugin-sort-imports como alternativa
      "import/order": "off",
      quotes: ["error", "double", { avoidEscape: true }],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
      "no-trailing-spaces": "error",
      "arrow-spacing": "error",
      "keyword-spacing": "error",
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "no-debugger": "error",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "error",
      "no-duplicate-imports": "error",
      "no-empty": "error",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-with": "error",
      "no-multi-spaces": "error",
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-else-return": "error",
      "no-nested-ternary": "warn",
      "max-depth": ["warn", 4],
      "max-nested-callbacks": ["warn", 3],
      "max-lines": [
        "warn",
        { max: 300, skipBlankLines: true, skipComments: true },
      ],
      complexity: ["warn", 15],
      "no-new-func": "error",
      "no-script-url": "error",
      "no-proto": "error",
      "prettier/prettier": "error",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/explicit-function-return-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-redeclare": "warn",
    },
  },
];
