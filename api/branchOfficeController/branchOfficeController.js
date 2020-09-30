const boService = require('../../services/branchOfficeServices/branchOfficeService');
const { handleResult, handleError } = require('../../utils');

module.exports = {
  // Create branch office
  createBO: async (req, res) => {
    const resp = await boService.createBO(req.body);
    handleResult(resp, res);
  },
  // Get all branch offices
  getBOs: async (req, res) => {
    let from = req.query.from;
    from = Number(from);
    let limit = req.query.limit;
    limit = Number(limit);
    const { fields = null, sortBy = null, filters = null } = req.body;
    const resp = await boService.getBOs(from, limit, fields, sortBy, filters);
    handleResult(resp, res);
  },
  getBO: async (req, res) => {
    const { fields = null } = req.body;
    const resp = await boService.getBO(req.params.id, fields);
    handleResult(resp, res);
  },
  // Update branch office
  updateBO: async (req, res) => {
    const resp = await boService.updateBO(req.params.id, req.body);
    handleResult(resp, res);
  },
  // Delete branch office
  deleteBO: async (req, res) => {
    const resp = await boService.deleteBO(req.params.id);
    handleResult(resp, res);
  },
};