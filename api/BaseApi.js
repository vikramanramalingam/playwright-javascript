const fs = require('fs');
const yaml = require('js-yaml');

class BaseApi {
    constructor(request) {
        this.request = request;
        this.apiConfig = this.loadApiConfig();
        this.baseUrl = this.apiConfig.base_url;
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }

    // Load the API endpoints from the YAML configuration
    loadApiConfig() {
        try {
            const fileContents = fs.readFileSync('./config/api_endpoints.yml', 'utf8');
            return yaml.load(fileContents);
        } catch (e) {
            console.error(e);
        }
    }

    // Basic method for GET request
    async get(endpoint, params = {}) {
        const url = this.baseUrl + endpoint;
        const response = await this.request.get(url, {
            headers: this.headers,
            params: params
        });
        return response;
    }

    // Basic method for POST request
    async post(endpoint, body = {}) {
        const url = this.baseUrl + endpoint;
        const response = await this.request.post(url, {
            headers: this.headers,
            data: body
        });
        return response;
    }

    // Basic method for PUT request
    async put(endpoint, body = {}) {
        const url = this.baseUrl + endpoint;
        const response = await this.request.put(url, {
            headers: this.headers,
            data: body
        });
        return response;
    }

    // Basic method for DELETE request
    async delete(endpoint) {
        const url = this.baseUrl + endpoint;
        const response = await this.request.delete(url, {
            headers: this.headers
        });
        return response;
    }
}

module.exports = { BaseApi };
