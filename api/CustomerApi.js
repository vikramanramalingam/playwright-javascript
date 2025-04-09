const { BaseApi } = require('./BaseApi');

class CustomerApi extends BaseApi {

    /**
     * Constructor for initializing the AccountsApi class.
     * @param {object} request - The request object (e.g., Playwright's `request` fixture) used to make HTTP requests.
     */
    constructor(request) {
        super(request);
    }

    /**
     * Method to get a customer id of the customer
     * This method makes a get request to the getCustomerId endpoint
     *
     * @param {string} username - The username of the customer
     * @param {string} password - The password of the customer
     *
     * @returns {Promise<object>} The response object returned by the Post request.
     */
    async getCustomerId(username, password) {
        const endpoint = this.apiConfig.endpoints.customers.getCustomerId
            .replace('{username}', username)
            .replace('{password}', password)
        const response = await this.get(endpoint, {});
        const responseBody = await response.json();
        return responseBody.id;
    }

    /**
     * Method to get a customer id of the customer
     * This method makes a get request to the getCustomerDetails endpoint
     *
     * @param {string} customerId - The customer id of the customer
     *
     * @returns {Promise<object>} The response object returned by the Post request.
     */
    async getCustomerAccounts(customerId) {
        const endpoint = this.apiConfig.endpoints.customers.getCustomerDetails
            .replace('{customerId}', customerId)
        const response = await this.get(endpoint, {});
        return response;
    }


}

module.exports = { CustomerApi };
