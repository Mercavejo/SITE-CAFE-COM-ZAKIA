import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "_next/**",
    "dist/**",
    "legacy/**",
    "online-server/**",
    "public/jogos/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Skills de agente instaladas (ex.: hyperframes) não fazem parte do app.
    ".claude/**",
  ]),
  {
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "react-hooks/set-state-in-effect": "off",
      "react/no-unescaped-entities": "off",
    },
  },
]);

export default eslintConfig;
