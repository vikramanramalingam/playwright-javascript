class TransferFundsLocators {

    constructor(page){
        this.page = page;
        this.transferButton = this.page.locator("xpath=//div[@id='showForm']//input[@value='Transfer']");
        this.amount = this.page.locator("xpath=//input[@id='amount']");
        this.fromAccountDropDown = this.page.locator("xpath=//div[@id='transferApp']/descendant::select[@id='fromAccountId']");
        this.transferCompleteText = this.page.locator("xpath=//div[@id='showResult']/h1[@class='title']");
    }

}

module.exports = { TransferFundsLocators };