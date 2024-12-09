const { TransferFundsLocators } = require("../locators/TransferFundsLocators");
const { PageHelper } = require('../utils/PageHelper');

class TransferFunds extends TransferFundsLocators {

    constructor(page){
        super(page);
        this.page = page;
    }

    /**
     * Transfers funds by filling in the amount and selecting the account from which to transfer.
     * It then clicks the "Transfer" button and waits for the transfer completion message.
     * @param {number} amount - The amount to transfer.
     * @param {string} accountNo - The account number from which the funds are to be transferred.
     * @returns {Promise<void>}
     */
    async transferFunds(amount, accountNo){
        await this.amount.fill(amount.toString());
        await PageHelper.selectOptionByLabel(this.fromAccountDropDown, accountNo);
        await this.transferButton.click();
        await PageHelper.waitForElementVisible(this.transferCompleteText);
    }

    /**
     * Retrieves the text displayed after a successful transfer.
     * @returns {Promise<string>} - The transfer completion text.
     */
    async getTransferSuccessMessage(){
        return await this.transferCompleteText.textContent();
    }

}

module.exports = { TransferFunds };
