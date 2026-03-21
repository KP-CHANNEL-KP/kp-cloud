import { defineConfig, globalIgnores } from "eslint/config";

import nextVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript.js";
import nextTs from "eslint-config-next/typescript";



export default defineConfig([
  nextVitals,
  typescript,
  nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);