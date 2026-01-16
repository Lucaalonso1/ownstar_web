// Minimal ESLint config for Next.js 15
// This config ensures the build works correctly in Vercel
export default [
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "node_modules/**",
    ],
  },
];
