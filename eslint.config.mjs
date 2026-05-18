import next from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "tina/__generated__/**",
      "public/admin/**",
      "next-env.d.ts",
    ],
  },
  ...next,
  {
    rules: {
      // React Compiler-oriented rules that flag working patterns here:
      // imperative three.js scene mutation and a menu-reset on route change.
      // Kept as warnings so they stay visible without failing `npm run lint`.
      "react-hooks/immutability": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default eslintConfig;
