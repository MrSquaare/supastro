/* eslint-disable import-x/no-named-as-default-member */
import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import importX from "eslint-plugin-import-x";
import prettier from "eslint-plugin-prettier/recommended";
import svelte from "eslint-plugin-svelte";
import tailwind from "eslint-plugin-tailwindcss";
import vue from "eslint-plugin-vue";
import globals from "globals";
import ts from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx,svelte,vue}"] },
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
  ...svelte.configs["flat/recommended"],
  {
    files: ["*.svelte", "**/*.svelte"],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
        extraFileExtensions: [".svelte"],
      },
    },
  },
  ...vue.configs["flat/recommended"],
  {
    files: ["*.vue", "**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
        extraFileExtensions: [".vue"],
      },
    },
  },
  prettier,
  ...astro.configs["flat/recommended"],
  {
    files: ["*.astro", "**/*.astro"],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
        extraFileExtensions: [".astro"],
      },
    },
  },
];
