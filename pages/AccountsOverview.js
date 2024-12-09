const { AccountOverviewLocators } = require("../locators/AccountsOverviewLocators");
const { PageHelper }  = require('../utils/PageHelper');

class AccountsOverview extends AccountOverviewLocators {

    constructor(page) {
        super(page);
        this.page = page;
    }

    /**
     * Verifies if the "Accounts Overview" section is present on the page.
     * @returns {Promise<boolean>} - A boolean indicating whether the "Accounts Overview" text is visible.
     */
    async verifyAccountsOverviewIsPresent() {
        return await PageHelper.containsLocator(this.accountOverviewText);
    }

    /**
     * Checks if a specific account number is present in the "Accounts Overview" table.
     * @param {string} accountNo - The account number to search for in the table.
     * @returns {Promise<boolean>} - A boolean indicating whether the account number exists in the table.
     */
    async verifyAccountNoIsPresent(accountNo) {
        return await PageHelper.containsLocator(this.verifyAccountNo(accountNo));
    }

    /**
     * Retrieves the balance for a specific account number from the "Accounts Overview" table.
     * @param {string} accountNo - The account number for which the balance is to be fetched.
     * @returns {Promise<string>} - A string representing the account balance (e.g., "$123.45").
     */
    async getAccountBalance(accountNo) {
        return await this.getAccountBalanceLocator(accountNo).textContent();
    }

}

module.exports = { AccountsOverview };
