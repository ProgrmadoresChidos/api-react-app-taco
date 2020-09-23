const organizationService = require('../../services/organizationServices/organizationService');
const { menuService_Post, menuService_GetById, menuService_GetByQuery, menuService_Update } = require('../../services/organizationServices/organizationService');
const { handleResult } = require('../../utils');

const menuController_Post = async (req, res) => {
  const result = await menuService_Post(req.body);
  handleResult(result, res);
}
const menuController_GetById = async (req, res) => {
  const result = await menuService_GetById(req.params.id);
  handleResult(result, res)
}
const menuController_GetByQuery = async (req, res) => {
  const result = await menuService_GetByQuery(req);
  handleResult(result, res);
}
const menuController_Update = async (req, res) => {
  const result = await menuService_Update(req);
  handleResult(result, res);
}

module.exports = {
  createOrganization: async (req, res) => {
    const resp = await organizationService.createOrganization(req.body);
    handleResult(resp, res);
  },
  menuController_Post,
  menuController_GetById,
  menuController_GetByQuery,
  menuController_Update
}