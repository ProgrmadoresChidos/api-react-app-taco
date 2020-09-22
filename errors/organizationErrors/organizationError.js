const Error = require('../classes/Error');

class OrganizationError extends Error {
  constructor(message, status) {
    super(message, status);
  }
}

module.exports = OrganizationError;