const { BaseApi } = require('./BaseApi'); // Import BaseApi class

class TransactionsApi extends BaseApi {

    constructor(request) {
        super(request);
    }

    // Method to process the transaction for a given account and amount
    async getTransactionsByAmount(accountNumber, amount) {
        const endpoint = this.apiConfig.endpoints.transactions.path
            .replace('{account_id}', accountNumber)
            .replace('{amount}', amount);
        console.log('the endpoint is:' + endpoint);
        const response = await this.get(endpoint, {});
        return response;
    }
}

module.exports = { TransactionsApi };
