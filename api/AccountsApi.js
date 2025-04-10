const { BaseApi } = require('./BaseApi');

class AccountsApi extends BaseApi {

    /**
     * Constructor for initializing the AccountsApi class.
     * @param {object} request - The request object (e.g., Playwright's `request` fixture) used to make HTTP requests.
     */
    constructor(request) {
        super(request);
    }

    /**
     * Method to create a new account
     * This method makes a POST request to the account creation endpoint
     *
     * @param {string|number} customerId - The customer id for whom the account needs to be created
     * @param {string|number} accountType - The account type for the new account
     * @param {string|number} sourceFundAccount - Account id from which source fund needs to be transferred for initial amount
     *
     * @returns {Promise<object>} The response object returned by the Post request.
     */
    async createAccount(customerId, accountType, sourceFundAccount) {
        const endpoint = this.apiConfig.endpoints.accounts.createAccount
            .replace('{customerId}', customerId)
            .replace('{accountType}', accountType)
            .replace('{sourceFundAccount}', sourceFundAccount);
        const response = await this.post(endpoint, {});
        const responseBody = await response.json();
        return responseBody;
    }
}

module.exports = { AccountsApi };
