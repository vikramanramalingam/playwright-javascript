const { BillPayLocators } = require("../locators/BillPayLocators");
const { PageHelper }  = require('../utils/PageHelper');

class BillPay extends BillPayLocators {

    constructor(page) {
        super(page);
        this.page = page;
    }

    /**
     * Pays a bill by filling in payee details, amount, and selecting the account to debit.
     * @param {Object} payeeDetails - An object containing the details of the payee.
     * @param {string} payeeDetails.firstName - The payee's name.
     * @param {string} payeeDetails.address - The payee's address.
     * @param {string} payeeDetails.city - The payee's city.
     * @param {string} payeeDetails.state - The payee's state.
     * @param {string} payeeDetails.zipcode - The payee's ZIP code.
     * @param {string} payeeDetails.phoneNumber - The payee's phone number.
     * @param {string} payeeDetails.accountNo - The payee's account number.
     * @param {string | number} amount - The amount to pay (as string or number).
     * @param {string | number} fromAccountNo - The account number to debit (as string or number).
     * @returns {Promise<void>}
     */
    async payBill(payeeDetails, amount, fromAccountNo) {
        await this.page.waitForTimeout(5000);
        await this.firstName.fill(payeeDetails.firstName);
        await this.address.fill(payeeDetails.address);
        await this.city.fill(payeeDetails.city);
        await this.state.fill(payeeDetails.state);
        await this.zipcode.fill(payeeDetails.zipcode);
        await this.phoneNumber.fill(payeeDetails.phoneNumber);
        await this.accountNo.fill(payeeDetails.accountNo);
        await this.verifyAccountNo.fill(payeeDetails.accountNo);
        await this.amount.fill(amount.toString());
        await PageHelper.selectOptionByLabel(this.fromAccountDropDown, fromAccountNo.toString());
        await this.sendPaymentButton.click();
        await PageHelper.waitForElementVisible(this.billPaidText, 10000);
    }

    /**
     * Retrieves the confirmation text displayed after a successful bill payment.
     * @returns {Promise<string>} - The confirmation message text (e.g., "Bill Payment Complete!").
     */
    async getBillPaidSuccessMessage() {
        return await this.billPaidText.textContent();
    }

}

module.exports = { BillPay };
