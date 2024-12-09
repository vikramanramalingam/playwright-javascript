class OpenNewAccountLocators {

    constructor(page){
        this.page = page;
        this.accountTypeDropDown = this.page.locator("xpath=//div[@id='openAccountForm']/form/select[@id='type']");
        this.openNewAccountButton = this.page.locator("xpath=//div[@id='openAccountForm']//input[@type='button']");
        this.accountOpeningText = this.page.locator("xpath=//div[@id='openAccountResult']/h1");
        this.accountNumberText = this.page.locator("xpath=//a[@id='newAccountId']");
    }

}

module.exports = { OpenNewAccountLocators };