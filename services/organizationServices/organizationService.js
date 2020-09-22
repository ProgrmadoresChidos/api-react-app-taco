const organizationRepository = require('../../repository/organizationRepository/organizationRepository');
const { handleError, validateName, validatePhoneNumber } = require('../../utils');
const OrganizationError = require('../../errors/organizationErrors/organizationError');

module.exports = {
  createOrganization: async ({ organization, name, lastName, phoneNumber }) => {
    try {
      let errors = {};
      if (!organization) {
        errors = {
          ...errors,
          organization: {
            message: "Please enter a Organization name",
          }
        }
      }
      if (!name) {
        errors = {
          ...errors,
          name: {
            message: "Please enter a name",
          }
        }
      } else {
        if (!validateName(name)) {
          errors = {
            ...errors,
            name: {
              message: "Please just enter letters",
            }
          }
        }
      }
      if (!lastName) {
        errors = {
          ...errors,
          lastName: {
            message: "Please enter a last name",
          }
        }
      } else {
        if (!validateName(lastName)) {
          errors = {
            ...errors,
            lastName: {
              message: "Please just enter letters",
            }
          }
        }
      }
      if (!phoneNumber) {
        errors = {
          ...errors,
          phoneNumber: {
            message: "Please enter a phone number",
          }
        }
      } else {
        if (!validatePhoneNumber(phoneNumber)) {
          errors = {
            ...errors,
            phoneNumber: {
              message: "Invalid phone number",
            }
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