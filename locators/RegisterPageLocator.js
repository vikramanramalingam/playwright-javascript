class RegisterPageLocators {

    constructor(page){
        this.page = page;
        this.firstName = this.page.locator("[name='customer.firstName']");
        this.lastName = this.page.locator("[name='customer.lastName']");
        this.address = this.page.locator("[name='customer.address.street']");
        this.city = this.page.locator("[name='customer.address.city']");
        this.state = this.page.locator("[name='customer.address.state']");
        this.zipcode = this.page.locator("[name='customer.address.zipCode']");
        this.phoneNumber = this.page.locator("[name='customer.phoneNumber']");
        this.ssn = this.page.locator("[name='customer.ssn']");
        this.username = this.page.locator("[name='customer.username']");
        this.password = this.page.locator("[name='customer.password']");
        this.confirmPassword = this.page.locator("[name='repeatedPassword']");
        this.registerButton = this.page.locator("input[type='submit'][value='Register']");
        this.welcomeText = this.page.locator("xpath=//div[@id='rightPanel']/h1[@class='title']");
    }

}

module.exports = { RegisterPageLocators };