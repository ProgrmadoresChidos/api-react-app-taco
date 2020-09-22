const OrganizationModel = require('../../models/organization/organization');

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
};