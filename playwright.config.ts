import { defineConfig, devices } from '@playwright/test';
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  globalTimeout: 60000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 1,
  reporter: [['html', { open: 'never' }]],

  use: {
    trace: 'on-first-retry',
    headless: false,
    launchOptions: {
      slowMo: 500, // just to slow down the execution of the test
    },
    baseURL: "https://www.saucedemo.com"

  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
