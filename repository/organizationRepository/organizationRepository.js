const OrganizationModel = require('../../models/organization/organization');
const menuModel = require('../../models/menu/menu');

const menuRepository_Post = async (type, tittle, price, description) => {

  const menu = new menuModel({
    type: type,
    tittle: tittle,
    price: price,
    description: description
  })

  return (await menu.save()).toJSON();
}

const menuRepository_GetById = async (id) => {
  const result = await menuModel.findById(id);
  return result ? result.toJSON() : result;
}

const menuRepository_GetByQuery = async (query, page, sort, maxPage) => {
  const result = await menuModel.find(query)
    .skip(page > 0 ? ((page - 1) * maxPage) : 0)
    .sort({ updatedAt: sort })
    .limit(maxPage);
  return result;
}

const menuRepository_Update = async (id, query) => {
  query = {
    ...query,
    updatedAt: Date.now()
  }
  const result = await menuModel.updateOne({ "_id": id }, { $set: query });
  return result;
}


module.exports = {
  createOrganization: async ({ organization: organizationName, name, lastName, phoneNumber }) => {
    const organization = new OrganizationModel({
      organization: organizationName,
      name,
      lastName,
      phoneNumber,
    });

    const newOrganization = await organization.save();

    return newOrganization.toJSON();
  },
  menuRepository_Post,
  menuRepository_GetById,
  menuRepository_GetByQuery,
  menuRepository_Update
};