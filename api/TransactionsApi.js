const { BaseApi } = require('./BaseApi');

class TransactionsApi extends BaseApi {

    /**
     * Constructor for initializing the TransactionsApi class.
     * @param {object} request - The request object (e.g., Playwright's `request` fixture) used to make HTTP requests.
     */
    constructor(request) {
        super(request);
    }

    /**
     * Fetches transactions for a given account number and amount.
     * This method makes a GET request to the transaction endpoint, replacing the placeholders in the URL with actual account number and amount.
     *
     * @param {string|number} accountNumber - The account number for which transactions are to be fetched.
     * @param {string|number} amount - The transaction amount to be searched for.
     *
     * @returns {Promise<object>} The response object returned by the GET request.
     */
    async getTransactionsByAmount(accountNumber, amount) {
        const endpoint = this.apiConfig.endpoints.transactions.path
            .replace('{account_id}', accountNumber)
            .replace('{amount}', amount);
        const response = await this.get(endpoint, {});
        return response;
    }

    /**
     * Method to transfer funds between accounts
     * This method makes a POST request to the transferFunds endpoint.
     *
     * @param {string|number} fromAccount - The from account number.
     * @param {string|number} toAccount - The to account number.
     * @param {string|number} amount - The amount to be transferred.
     *
     * @returns {Promise<object>} The response object returned by the GET request.
     */
    async transferFunds(fromAccount, toAccount, amount) {
        const endpoint = this.apiConfig.endpoints.transactions.transferFunds
            .replace('{fromAccountId}', fromAccount)
            .replace('{toAccountId}', toAccount)
            .replace('{amount}', amount)
        const response = await this.post(endpoint, {});
        return response;
    }
}

module.exports = { TransactionsApi };
