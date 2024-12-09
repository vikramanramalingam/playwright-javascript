class PageHelper {

  /**
   * Navigates to a URL and waits for the page to load.
   * @param {import('playwright').Page} page - The Playwright Page instance.
   * @param {string} url - The URL to navigate to.
   */
  static async goTo(page, url) {
    await page.goto(url);
    await this.waitForPageToLoad(page); // Ensure page load state
  }

  /**
   * Waits for an element to be visible within a timeout period.
   * @param {import('playwright').Page} page - The Playwright Page instance.
   * @param {string} element - The locator of the element (CSS or XPath).
   * @param {number} [timeout=5000] - Timeout in milliseconds (default: 5000).
   */
  static async waitForElementVisible(element, timeout = 5000) {
    await element.waitFor({ state: 'visible', timeout }); // Wait for visibility
  }

   /**
   * Select an option from a dropdown by its label.
   * @param {import('@playwright/test').Page} page - The Playwright page instance.
   * @param {object} element - Locator object for the dropdown.
   * @param {string} label - The visible text of the option to select.
   */
    static async selectOptionByLabel(element, label) {
        await element.selectOption({ label });
    }

  /**
   * Waits for the page to reach the specified load state.
   * @param {import('playwright').Page} page - The Playwright Page instance.
   * @param {'load' | 'domcontentloaded' | 'networkidle'} [state='load'] - The desired load state (default: 'load').
   */
  static async waitForPageToLoad(page, state = 'load') {
    await page.waitForLoadState(state); // Wait for the page to reach the specified state
  }

   /**
   * Check if a locator exists on the page.
   * @param {import('@playwright/test').Locator} element - The locator object from the locators class.
   * @returns {Promise<boolean>} - Returns true if the locator exists, false otherwise.
   */
  static async containsLocator(element) {
    const count = await element.count();
    return count > 0;
  }
}

module.exports = { PageHelper };
