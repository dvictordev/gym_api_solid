import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [
      [
        "src/http/controller/**",
        "./prisma/vitest-environment-prisma/prisma-test-environment.ts",
      ],
    ],
    dir: "src",
  },
});
