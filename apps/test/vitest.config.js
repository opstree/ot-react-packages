import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    testTimeout: 120000,
    hookTimeout: 120000,
    globals: true,
    environment: "node",
    globalSetup: ["./utils/setup.js"],
    maxConcurrency: 4,
    isolate: false,
  },
  plugins: [
    tsconfigPaths({
      ignoreConfigErrors: true,
    }),
  ],
})