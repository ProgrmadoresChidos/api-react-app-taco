const organizationRepository = require('../../repository/organizationRepository/organizationRepository');
const { handleError } = require('../../utils');
const OrganizationError = require('../../errors/organizationErrors/organizationError');

module.exports = {
  createOrganization: async ({ organization, name, lastName, phoneNumber }) => {
    try {
      let errors = {};
      if (!organization) {
        errors = {
          ...errors,
          organization: {
            message: "Invalid Organization name",
          }
        }
      }
      if (!name) {
        errors = {
          ...errors,
          name: {
            message: "Invalid name",
          }
        }
      }
      if (!lastName) {
        errors = {
          ...errors,
          lastName: {
            message: "Invalid last name",
          }
        }
      }
      if (!phoneNumber) {
        errors = {
          ...errors,
          phoneNumber: {
            message: "Invalid phone number",
          }
        }
      }
      if (Object.keys(errors).length) {
        throw { errors };
      }
      const newOrganization = await organizationRepository.createOrganization({ organization, name, lastName, phoneNumber });
      return {
        status: 200,
        ...newOrganization,
      };
    } catch (error) {
      return new OrganizationError(handleError(error), 400);
    }
  }
}