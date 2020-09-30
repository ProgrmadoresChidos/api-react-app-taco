const BOSchema = require('../../models/branchOffice/branchOffice');
const { filterToRegex } = require('../../utils');

const FIELDS = 'org address phoneNumber score';

module.exports = {
  // Create branch office
  createBO: async ({ org, address, phoneNumber, score, openingHours }) => {
    const bo = new BOSchema({
      org,
      address,
      phoneNumber,
      score,
      openingHours,
    });
    const newBO = await bo.save();
    return newBO.toJSON();
  },
  // Get all branch offices
  getBOs: async (from = 0, limit = 0, fields = FIELDS, sortBy = 'address', filters = {}) => {
    const newFilters = filterToRegex(filters);
    const query = BOSchema.find(newFilters, fields)
      .sort(sortBy)
      .skip(from);
    if (!!limit) {
      query.limit(limit);
    }
    const bos = await query.exec();
    return bos;
  },
  getBO: async (id, fields = FIELDS) => {
    const bo = await BOSchema.findById(id, fields).exec();
    return bo ? bo.toJSON() : bo;
  },
  updateBO: async (id, fields) => {
    const { menu, tickets, ...rest } = fields;
    const updatedBo = await BOSchema.findByIdAndUpdate(id, rest, { new: true, runValidators: true, context: 'query' }).exec();
    return updatedBo ? updatedBo.toJSON() : updatedBo;
  },
  deleteBO: async (id) => {
    const deletedBo = await BOSchema.findByIdAndRemove(id).exec();
    return deletedBo ? deletedBo.toJSON() : deletedBo;
  },
};