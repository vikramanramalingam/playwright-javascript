const { HomePageLocators } = require("../locators/HomePageLocators");
const { PageHelper }  = require('../utils/PageHelper');

class HomePage extends HomePageLocators {

    constructor(page){
        super(page)
        this.page = page;
    }

    /**
     * Navigates to the "Open New Account" page and waits for the button to be visible.
     * @returns {Promise<void>}
     */
    async goToOpenNewAccount(){
        await this.openNewAccountLink.click();
        await PageHelper.waitForElementVisible(this.openNewAccountButton);
    }

    /**
     * Navigates to the "Accounts Overview" page and waits for the accounts overview table to be visible.
     * @returns {Promise<void>}
     */
    async goToAccountsOverview(){
        await this.accountsOverviewLink.click();
        await PageHelper.waitForElementVisible(this.accountsOverviewTable, 10000);
    }

    /**
     * Navigates to the "Transfer Funds" page and waits for the transfer button to be visible.
     * @returns {Promise<void>}
     */
    async goToTransferFunds(){
        await this.transferFundsLink.click();
        await PageHelper.waitForElementVisible(this.transferButton);
    }

    /**
     * Navigates to the "Bill Pay" page and waits for the "Send Payment" button to be visible.
     * @returns {Promise<void>}
     */
    async goToBillPay(){
        await this.billPayLink.click();
        await PageHelper.waitForElementVisible(this.sendPaymentButton);
    }

}

module.exports = { HomePage };
