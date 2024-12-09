const { LoginPageLocators } = require("../locators/LoginPageLocators");
const { PageHelper }  = require('../utils/PageHelper');

class LoginPage extends LoginPageLocators {

    constructor(page){
        super(page)
        this.page = page;
    }

    /**
     * Clicks the "Register" link on the login page.
     * @returns {Promise<void>}
     */
    async clickRegisterLink(){
        await this.registerLink.click();
    }

    /**
     * Logs the user in by filling in the username and password and clicking the login button.
     * Waits for the logout button to become visible after a successful login.
     * @param {string} username - The username for login.
     * @param {string} password - The password for login.
     * @returns {Promise<void>}
     */
    async login(username, password){
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    /**
     * Retrieves the login error message text, if login fails.
     * @returns {Promise<string>} - The error message text.
     */
    async getLoginError(){
        await PageHelper.waitForElementVisible(this.loginErrorMessage);
        return await this.loginErrorMessage.textContent();
    }

    /**
     * Clicks the "Logout" button on the login page.
     * @returns {Promise<void>}
     */
    async clickLogout(){
        await this.logout.click();
    }

    /**
     * Verifies if the login button is present on the login page.
     * @returns {Promise<boolean>} - True if the login button is present, otherwise false.
     */
    async verifyLogInButtonIsPresent(){
        return await PageHelper.containsLocator(this.loginButton);
    }

    /**
     * Verifies if the logout button is present on the page after a successful login.
     * @returns {Promise<boolean>} - True if the logout button is present, otherwise false.
     */
    async verifyLogOutButtonIsPresent(){
        await PageHelper.waitForElementVisible(this.logout);
        return await PageHelper.containsLocator(this.logout);
    }

}

module.exports = { LoginPage };
