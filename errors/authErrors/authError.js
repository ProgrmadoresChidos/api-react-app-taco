const Error = require('../classes/Error');

class AuthError extends Error {
    constructor(message, status) {
        super(message, status);
    }
}

module.exports = AuthError;