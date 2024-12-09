const { OpenNewAccountLocators } = require("../locators/OpenNewAccountLocators");
const { PageHelper }  = require('../utils/PageHelper');

class OpenNewAccount extends OpenNewAccountLocators {

    constructor(page){
        super(page);
        this.page = page;
    }

    /**
     * Opens a savings account by selecting the "SAVINGS" option from the account type dropdown
     * and clicking the "Open New Account" button. Waits for the account opening confirmation text.
     * @returns {Promise<void>}
     */
    async openSavingsAccount(){
        await PageHelper.selectOptionByLabel(this.accountTypeDropDown,'SAVINGS');
        await this.page.waitForTimeout(2000);
        await this.openNewAccountButton.click();
        await PageHelper.waitForElementVisible(this.accountOpeningText);
    }

    /**
     * Retrieves the account number of the newly opened account.
     * @returns {Promise<string>} - The account number text.
     */
    async getAccountNumber(){
        return await this.accountNumberText.textContent();
    }

    /**
     * Retrieves the account opening confirmation message.
     * @returns {Promise<string>} - The confirmation message text.
     */
    async getAccountOpenedMsg(){
        return await this.accountOpeningText.textContent();
    }

}

module.exports = { OpenNewAccount };
