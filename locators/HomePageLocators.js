class HomePageLocators {

    constructor(page){
        this.page = page;
        this.openNewAccountLink = this.page.locator("xpath=//div[@id='leftPanel']/descendant::a[@href='openaccount.htm']");
        this.accountsOverviewLink = this.page.locator("xpath=//div[@id='leftPanel']/descendant::a[@href='overview.htm']");
        this.transferFundsLink = this.page.locator("xpath=//div[@id='leftPanel']/descendant::a[@href='transfer.htm']");
        this.billPayLink = this.page.locator("xpath=//div[@id='leftPanel']/descendant::a[@href='billpay.htm']");
        this.accountsOverviewTable = this.page.locator("xpath=//div[@id='overviewAccountsApp']//table[@id='accountTable']");
        this.transferButton = this.page.locator("xpath=//div[@id='showForm']//input[@value='Transfer']");
        this.openNewAccountButton = this.page.locator("xpath=//div[@id='openAccountForm']//input[@type='button']");
        this.sendPaymentButton = this.page.locator("xpath=//input[@type='button'][@value='Send Payment']");
    }

}

module.exports = { HomePageLocators };