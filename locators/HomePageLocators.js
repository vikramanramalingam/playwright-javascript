class HomePageLocators {

    constructor(page){
        this.page = page;
        this.openNewAccountLink = this.page.locator("xpath=//div[@id='leftPanel']/descendant::a[@href='openaccount.htm']");
        this.accountsOverviewLink = this.page.locator("xpath=//div[@id='leftPanel']/descendant::a[@href='overview.htm']");
        this.transferFundsLink = this.page.locator("xpath=//div[@id='leftPanel']/descendant::a[@href='transfer.htm']");
        this.billPayLink = this.page.locator("xpath=//div[@id='leftPanel']/descendant::a[@href='billpay.htm']");
        this.aboutUsLink = this.page.locator("xpath=//div[@id='headerPanel']/descendant::a[text()='About Us']");
        this.servicesLink = this.page.locator("xpath=//div[@id='headerPanel']/descendant::a[@href='services.htm']");
        this.productsLink = this.page.locator("xpath=//div[@id='headerPanel']/descendant::a[text()='Products']");
        this.locationsLink = this.page.locator("xpath=//div[@id='headerPanel']/descendant::a[text()='Locations']");
        this.adminLink = this.page.locator("xpath=//div[@id='headerPanel']/descendant::a[@href='admin.htm']");
        this.accountsOverviewTable = this.page.locator("xpath=//div[@id='overviewAccountsApp']//table[@id='accountTable']");
        this.transferButton = this.page.locator("xpath=//div[@id='showForm']//input[@value='Transfer']");
        this.openNewAccountButton = this.page.locator("xpath=//div[@id='openAccountForm']//input[@type='button']");
        this.sendPaymentButton = this.page.locator("xpath=//input[@type='button'][@value='Send Payment']");
        this.aboutUsHeaderText = this.page.locator("xpath=//div[@id='rightPanel']/h1");
        this.servicesHeaderText = this.page.locator("xpath=//div[@id='rightPanel']/span[1]");
        this.servicesAllHeaderTexts = this.page.locator("xpath=//div[@id='rightPanel']/span");
        this.productsPageText = this.page.locator("xpath=//div[@class='content']/p[@class='page-title']");
        this.adminPageAllSectionTexts = this.page.locator("xpath=//form[@id='adminForm']/h3");
    }

}

module.exports = { HomePageLocators };