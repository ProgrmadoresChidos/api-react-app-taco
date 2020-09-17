const Error = require('../classes/Error');

class OrgErrors extends Error {
    constructor(message, status) {
        super(message, status);
    }
}

module.exports = OrgErrors;