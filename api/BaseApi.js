const fs = require('fs');
const yaml = require('js-yaml');

class BaseApi {
    /**
     * Constructor for initializing the BaseApi class.
     * @param {object} request - The request object (e.g., Playwright's `request` fixture) used to make HTTP requests.
     */
    constructor(request) {
        this.request = request;
        this.apiConfig = this.loadApiConfig();
        this.baseUrl = this.apiConfig.base_url;
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }

    /**
     * Loads the API configuration from a YAML file.
     * @returns {object} The API configuration, including the base URL and endpoints.
     */
    loadApiConfig() {
        try {
            const fileContents = fs.readFileSync('./config/api_endpoints.yml', 'utf8');
            return yaml.load(fileContents);
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * Sends a GET request to the provided endpoint.
     * @param {string} endpoint - The specific endpoint to which the GET request will be sent (e.g., `/api/v1/users`).
     * @param {object} [params={}] - Optional. The query parameters to be sent with the request.
     * @returns {object} The response from the GET request.
     */
    async get(endpoint, params = {}) {
        const url = this.baseUrl + endpoint;
        const response = await this.request.get(url, {
            headers: this.headers,
            params: params
        });
        return response;
    }

    /**
     * Sends a POST request to the provided endpoint.
     * @param {string} endpoint - The specific endpoint to which the POST request will be sent (e.g., `/api/v1/users`).
     * @param {object} [body={}] - Optional. The body of the POST request (e.g., user data to be created).
     * @returns {object} The response from the POST request.
     */
    async post(endpoint, body = {}) {
        const url = this.baseUrl + endpoint;
        const response = await this.request.post(url, {
            headers: this.headers,
            data: body
        });
        return response;
    }

    /**
     * Sends a PUT request to the provided endpoint.
     * @param {string} endpoint - The specific endpoint to which the PUT request will be sent (e.g., `/api/v1/users/123`).
     * @param {object} [body={}] - Optional. The body of the PUT request (e.g., updated user data).
     * @returns {object} The response from the PUT request.
     */
    async put(endpoint, body = {}) {
        const url = this.baseUrl + endpoint;
        const response = await this.request.put(url, {
            headers: this.headers,
            data: body
        });
        return response;
    }

    /**
     * Sends a DELETE request to the provided endpoint.
     * @param {string} endpoint - The specific endpoint to which the DELETE request will be sent (e.g., `/api/v1/users/123`).
     * @returns {object} The response from the DELETE request.
     */
    async delete(endpoint) {
        const url = this.baseUrl + endpoint;
        const response = await this.request.delete(url, {
            headers: this.headers
        });
        return response;
    }
}

module.exports = { BaseApi };
