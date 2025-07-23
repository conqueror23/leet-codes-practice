import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import markdown from "eslint-plugin-markdown";


export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.md"],
    plugins: {
      markdown
    },
    processor: "markdown/markdown"
  },
  {
    files: ["**/*.md/*.{js,ts}"],
    languageOptions: {
      globals: globals.browser
    },
    rules: {
      // Disable some rules that don't make sense in code blocks
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-undef": "off",
      "no-undef": "off",
      "no-unused-vars": "off"
    }
  }
];
