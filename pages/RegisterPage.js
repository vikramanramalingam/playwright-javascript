const { RegisterPageLocators } = require("../locators/RegisterPageLocator");

class RegisterPage extends RegisterPageLocators {

    constructor(page){
        super(page);
        this.page = page;
    }

    /**
     * Registers a new user by filling in the registration form with the provided user data.
     * After filling in all fields, it clicks the "Register" button.
     * @param {Object} userData - The user data to register.
     * @param {string} userData.firstName - The user's first name.
     * @param {string} userData.lastName - The user's last name.
     * @param {string} userData.address - The user's address.
     * @param {string} userData.city - The user's city.
     * @param {string} userData.state - The user's state.
     * @param {string} userData.zipcode - The user's zip code.
     * @param {string} userData.phoneNumber - The user's phone number.
     * @param {string} userData.ssn - The user's social security number.
     * @param {string} userData.username - The username for the new user.
     * @param {string} userData.password - The password for the new user.
     * @returns {Promise<void>}
     */
    async registerNewUser(userData){
        await this.firstName.fill(userData.firstName);
        await this.lastName.fill(userData.lastName);
        await this.address.fill(userData.address);
        await this.city.fill(userData.city);
        await this.state.fill(userData.state);
        await this.zipcode.fill(userData.zipcode);
        await this.phoneNumber.fill(userData.phoneNumber);
        await this.ssn.fill(userData.ssn);
        await this.username.fill(userData.username);
        await this.password.fill(userData.password);
        await this.confirmPassword.fill(userData.password);
        await this.registerButton.click();
    }

    /**
     * Retrieves the welcome text displayed after successful registration.
     * @returns {Promise<string>} - The welcome text.
     */
    async getWelcomeText(){
        return await this.welcomeText.textContent();
    }

}

module.exports = { RegisterPage };
