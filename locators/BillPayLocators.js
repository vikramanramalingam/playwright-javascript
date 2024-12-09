class BillPayLocators {

    constructor(page){
        this.page = page;
        this.firstName = this.page.locator("[name='payee.name']");
        this.address = this.page.locator("[name='payee.address.street']");
        this.city = this.page.locator("[name='payee.address.city']");
        this.state = this.page.locator("[name='payee.address.state']");
        this.zipcode = this.page.locator("[name='payee.address.zipCode']");
        this.phoneNumber = this.page.locator("[name='payee.phoneNumber']");
        this.accountNo = this.page.locator("[name='payee.accountNumber']");
        this.verifyAccountNo = this.page.locator("[name='verifyAccount']");
        this.amount = this.page.locator("[name='amount']");
        this.fromAccountDropDown = this.page.locator("#billpayForm select[name='fromAccountId']");
        this.sendPaymentButton = this.page.locator("input.button[value='Send Payment']");
        this.billPaidText = this.page.locator("#billpayResult > h1.title");
    }

}

module.exports = { BillPayLocators };