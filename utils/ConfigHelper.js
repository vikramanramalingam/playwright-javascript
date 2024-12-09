const fs = require('fs');
const yaml = require('js-yaml');

function loadConfig(file_path) {
    const file = fs.readFileSync(file_path, 'utf8');
    const config = yaml.load(file);
    return config;
}

module.exports = { loadConfig };
