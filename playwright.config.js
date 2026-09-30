// @ts-check
const { defineConfig } = require('@playwright/test');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Playwright configuration for the SEP QA Automation project.
 * Base URL and credentials come from the .env file.
 */
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    // JUnit XML report so Jenkins CI can publish per-test results and trends.
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  use: {
    baseURL: process.env.SEP_QA_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000,
    // The SEP QA environment is protected by HTTP Basic Authentication.
    // Credentials come from the .env file - never hardcode them.
    httpCredentials: {
      username: process.env.SEP_USERNAME,
      password: process.env.SEP_PASSWORD,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium', viewport: { width: 1280, height: 720 } },
    },
  ],
});
