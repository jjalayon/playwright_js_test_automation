// fixtures/baseFixtures.js
const base = require('@playwright/test');
const { LoginPage } = require('../resources/actions/LoginPage.actions');


const test = base.test.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

module.exports = {
  test,
  expect: base.expect,
};
