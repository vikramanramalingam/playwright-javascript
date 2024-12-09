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
        // Replace placeholders in the URL with the actual account number and amount
        const endpoint = this.apiConfig.endpoints.transactions.path
            .replace('{account_id}', accountNumber)
            .replace('{amount}', amount);

        // Log the endpoint for debugging purposes
        console.log('The endpoint is: ' + endpoint);

        // Perform the GET request and return the response
        const response = await this.get(endpoint, {});
        return response;
    }
}

module.exports = { TransactionsApi };
