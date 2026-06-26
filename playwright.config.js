const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // Directory containing test files
  timeout: 30 * 1000, // 30 seconds per test
  expect: {
    timeout: 5000, // 5 seconds for expect assertions
  },
  fullyParallel: false, // Run tests in parallel
  retries: 1, // Retry failed tests once
  reporter: [['line'], ['allure-playwright']], // Console + HTML report
  use: {
    headless: true, // Run in headless mode
    baseURL: 'https://www.saucedemo.com/', // Change to your app's base URL
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure', // Capture screenshots only on failure
    trace: 'retain-on-failure', // Keep trace for failed tests
    actionTimeout: 0, // No limit for individual actions
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
