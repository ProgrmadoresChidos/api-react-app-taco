const organizationService = require('../../services/organizationServices/organizationService');
const { handleResult } = require('../../utils');

module.exports = {
  createOrganization: async (req, res) => {
    const resp = await organizationService.createOrganization(req.body);
    handleResult(resp, res);
  }
}