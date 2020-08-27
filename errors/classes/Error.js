class Error {
    constructor(message, status) {
        this.message = message;
        this.status = status;
    }
    toJson(){
        return {
            status : this.status,
            message: this.message,
        }
    }
}

module.exports = Error;