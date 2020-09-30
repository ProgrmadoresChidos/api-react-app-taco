const Error = require('../classes/Error');

// Branch Office Error
class BOError extends Error {
  constructor(message, status) {
    super(message, status);
  }
}

module.exports = BOError;