class AccountOverviewLocators{

    constructor(page){
        this.page = page;
        this.accountOverviewText = this.page.locator("xpath=//div[@id='showOverview']/h1[normalize-space(text())='Accounts Overview']");
        this.accountsOverviewTable = this.page.locator("xpath=//div[@id='overviewAccountsApp']//table[@id='accountTable']");
    }

    getAccountBalanceLocator(accountNumber) {
        return this.page.locator(`xpath=//table[@id='accountTable']/descendant::a[text()='${accountNumber}']/ancestor::tr/td[2]`);
    }

    verifyAccountNo(accountNumber){
        return this.page.locator(`xpath=//table[@id='accountTable']/descendant::a[text()='${accountNumber}']`);
    }

}

module.exports = { AccountOverviewLocators };