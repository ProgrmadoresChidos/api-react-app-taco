const organizationRepository = require("../../repository/organizationRepository/organizationRepository");
const {
  menuRepository_GetById,
  menuRepository_GetByQuery,
  menuRepository_Post,
} = require("../../repository/organizationRepository/organizationRepository");
const {
  handleError,
  validateName,
  validatePhoneNumber,
} = require("../../utils");
const OrganizationError = require("../../errors/organizationErrors/organizationError");

const isValid = (fieldName, value, message = "Field is required") => {
  let errors = null;
  if (!value) {
    errors = {
      [fieldName]: { message: message },
    };
  }

  return errors;
};

const menuService_Post = async (menu) => {
  try {
    const { type, tittle, price, description } = menu;
    let errorMap = {};
    let errors = [];
    errors.push(isValid("type", type, "Please enter the type"));
    errors.push(isValid("tittle", tittle, "Please enter the tittle"));
    errors.push(isValid("price", price, "Please enter the price"));
    errors = errors.filter((err) => err);
    errorMap =
      errors.length > 0
        ? errors.reduce(
          (obj, el) => ({
            ...obj,
            ...el,
          }),
          {}
        )
        : null;
    if (errorMap === null) {
      const { __v, ...data } = await menuRepository_Post(
        type,
        tittle,
        Number(price),
        description
      );
      return {
        ...data,
        status: 201,
      };
    } else {
      throw { errors: { ...errorMap } };
    }
  } catch (err) {
    return new OrganizationError(handleError(err), 400);
  }
};

const menuService_GetById = async (req) => {
  try {
    const idParameter = req.params.id;
    if (idParameter) {
      const result = await menuRepository_GetById(idParameter);
      if (!result)
        throw {
          errors: [
            {
              id: {
                message: "No se encuentran resultados",
              },
            },
          ],
        };
      return result;
    }
  } catch (err) {
    return err;
  }
};

const menuService_GetByQuery = async (req) => {
  try {
    const { type, tittle, desc } = req.body;
    let query = { $or: [{ tittle: "bistec" }, { type: "Taco" }] };
    const result = await menuRepository_GetByQuery(query);
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = {
  createOrganization: async ({ organization, name, lastName, phoneNumber }) => {
    try {
      let errors = {};
      if (!organization) {
        errors = {
          ...errors,
          organization: {
            message: "Please enter a Organization name",
          },
        };
      }
      if (!name) {
        errors = {
          ...errors,
          name: {
            message: "Please enter a name",
          },
        };
      } else {
        if (!validateName(name)) {
          errors = {
            ...errors,
            name: {
              message: "Please just enter letters",
            },
          };
        }
      }
      if (!lastName) {
        errors = {
          ...errors,
          lastName: {
            message: "Please enter a last name",
          },
        };
      } else {
        if (!validateName(lastName)) {
          errors = {
            ...errors,
            lastName: {
              message: "Please just enter letters",
            },
          };
        }
      }
      if (!phoneNumber) {
        errors = {
          ...errors,
          phoneNumber: {
            message: "Please enter a phone number",
          },
        };
      } else {
        if (!validatePhoneNumber(phoneNumber)) {
          errors = {
            ...errors,
            phoneNumber: {
              message: "Invalid phone number",
            },
          };
        }
      }
      if (Object.keys(errors).length) {
        throw { errors };
      }
      const newOrganization = await organizationRepository.createOrganization({
        organization,
        name,
        lastName,
        phoneNumber,
      });
      return {
        status: 200,
        ...newOrganization,
      };
    } catch (error) {
      return new OrganizationError(handleError(error), 400);
    }
  },
  menuService_Post,
  menuService_GetById,
  menuService_GetByQuery,
};
