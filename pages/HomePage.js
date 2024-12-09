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

    /**
     * Navigates to the "About Us" page and waits for the header text to be visible.
     * @returns {Promise<void>}
     */
    async goToAboutUs(){
        await this.aboutUsLink.click();
        await PageHelper.waitForElementVisible(this.aboutUsHeaderText);
    }

    /**
     * Retrieves the header text of the "About Us" page.
     * @returns {Promise<string>}
     */
    async getAboutUsHeaderText(){
        return await this.aboutUsHeaderText.textContent();
    }

    /**
     * Navigates to the "Services" page and waits for the header text to be visible.
     * @returns {Promise<void>}
     */
    async goToServices(){
        await this.servicesLink.click();
        await PageHelper.waitForElementVisible(this.servicesHeaderText, 10000);
    }

    /**
     * Retrieves the header texts for all services.
     * @returns {Promise<string[]>}
     */
    async getServicesHeaderText(){
        return await this.servicesAllHeaderTexts.allTextContents();
    }

    /**
     * Navigates to the "Admin" page and waits for the header text to be visible.
     * @returns {Promise<void>}
     */
    async goToAdminPage(){
        await this.adminLink.click();
        await PageHelper.waitForElementVisible(this.aboutUsHeaderText);
    }

    /**
     * Retrieves the header text of the "Admin" page.
     * @returns {Promise<string>}
     */
    async getAdminPageHeaderText(){
        return await this.aboutUsHeaderText.textContent();
    }

    /**
     * Retrieves the text contents of all sections in the "Admin" page.
     * @returns {Promise<string[]>}
     */
    async getAdminPageSectionsTexts(){
        return await this.adminPageAllSectionTexts.allTextContents();
    }

    /**
     * Navigates to the "Products" page and waits for the header text to be visible.
     * @returns {Promise<void>}
     */
    async goToProductsPage(){
        await this.productsLink.click();
        await PageHelper.waitForElementVisible(this.productsPageText);
    }

    /**
     * Retrieves the header text of the "Products" page.
     * @returns {Promise<string>}
     */
    async getProductsPageHeaderText(){
        return await this.productsPageText.textContent();
    }

}

module.exports = { HomePage };
