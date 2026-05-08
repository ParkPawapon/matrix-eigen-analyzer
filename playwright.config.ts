import { defineConfig, devices } from "@playwright/test";

const baseUrl = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3100";

export default defineConfig({
  expect: {
    timeout: 10_000,
  },
  fullyParallel: true,
  reporter: "list",
  testDir: "./tests/e2e",
  use: {
    ...devices["Desktop Chrome"],
    baseURL: baseUrl,
    trace: "on-first-retry",
  },
  webServer: process.env.PLAYWRIGHT_SKIP_WEB_SERVER
    ? undefined
    : {
        command: "bun dev --hostname 127.0.0.1 --port 3100",
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
        url: baseUrl,
      },
});
