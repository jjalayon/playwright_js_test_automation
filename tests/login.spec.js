import { test, expect } from '../fixtures/baseWebFixtures';

test.describe('Login Tests', () => {

  test('TC_01: Should login successfully with valid credentials', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('/inventory.html');
  });

  test('TC_02: Should show error for locked out user', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Epic sadface: Sorry, this user has been locked out.');
  });
});
