class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a given path (relative to baseURL)
   */
  async goto(path) {
    await this.page.goto(path);
  }

  /**
   * Wait for an element to be visible
   */
  async waitForVisible(selector, timeout = 5000) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  /**
   * Click an element
   */
  async click(selector) {
      await this.page.click(selector);
    }

  /**
   * Fill an input field
   */
  async fillField(selector, value) {
    await this.page.fill(selector, value);
  }

  /**
   * Get text content of an element
   */
  async getText(selector) {
    await this.waitForVisible(selector);
    return this.page.textContent(selector);
  }
}

module.exports = { BasePage };
