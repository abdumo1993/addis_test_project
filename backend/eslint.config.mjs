import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Base for JS
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended", "plugin:prettier/recommended"],
    languageOptions: {
      globals: { ...globals.node },
      sourceType: "module",
    },
    ignores: ["dist/**", "node_modules/**"],
  },
  // TS specific
  ...tseslint.configs.recommended,
]);
