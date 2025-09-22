import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    ignores: [
      // "src/types/next-auth.d.ts", 
      // "generated/",
            "**/node_modules/**",
      "**/.next/**",
      "**/out/**",
      "src/types/next-auth.d.ts",
      "generated/**", // Ignora la carpeta 'generated' en cualquier nivel
      "**/generated/**", // Otra forma de asegurar que la ignore
      "generated/prisma/**", // Siendo muy específicos
    ],
  },

];

export default eslintConfig;
