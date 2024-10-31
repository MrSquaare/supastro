import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import importX from "eslint-plugin-import-x";
import prettier from "eslint-plugin-prettier/recommended";
import tailwind from "eslint-plugin-tailwindcss";
import globals from "globals";
import ts from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { ignores: ["dist", ".astro"] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  prettier,
  ...tailwind.configs["flat/recommended"],
  {
    rules: {
      "import-x/no-unresolved": "off",
      "import-x/order": [
        "warn",
        {
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
        },
      ],
    },
  },
  {
    ...astro.configs.recommended,
    files: ["*.astro"],
    processor: "astro/client-side-ts",
    parser: "astro-eslint-parser",
    parserOptions: {
      parser: "@typescript-eslint/parser",
      extraFileExtensions: [".astro"],
    },
  },
];
