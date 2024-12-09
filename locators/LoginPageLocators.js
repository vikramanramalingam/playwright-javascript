class LoginPageLocators {

    constructor(page){
        this.page = page;
        this.userName = this.page.locator("[name='username']");
        this.password = this.page.locator("[name='password']");
        this.loginButton = this.page.locator("input[type='submit'][value='Log In']");
        this.loginErrorMessage = this.page.locator("xpath=//div[@id='rightPanel']/p[@class='error']");
        this.registerLink = this.page.locator("#loginPanel a:has-text('Register')");
        this.logout = this.page.locator("xpath=//div[@id='leftPanel']/descendant::li/a[text()='Log Out']");
    }

}

module.exports = { LoginPageLocators };