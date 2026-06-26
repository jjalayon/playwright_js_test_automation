// pages/LoginPage.js
const { BasePage } = require('./BasePage.actions');
const loginLocators = require('../pageObjects/loginPage.locators');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = loginLocators;
  }

    async goto(path) {
    await this.page.goto('');
  }

  async login(username, password) {
    await this.fillField(this.locators.usernameInput, username);
    await this.fillField(this.locators.passwordInput, password);
    await this.click(this.locators.loginButton);
  }

  async getErrorMessage() {
    return this.getText(this.locators.errorMessage);
  }

  async TitlePageShouldBeVisible(titlePageLocator) {
    await this.page.waitForVisible(titlePageLocator);
  }
}

module.exports = { LoginPage };