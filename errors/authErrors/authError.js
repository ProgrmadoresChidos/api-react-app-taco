const Error = require('../classes/Error');

class AuthError extends Error {
    constructor(message, status) {
        super(message, status);
    }
    getStatus() {
        return this.status;
    }
    getMessage() {
        return this.message;
    }
    print(){
        console.log(this.getStatus(), this.getMessage())
    }
}

module.exports = AuthError;