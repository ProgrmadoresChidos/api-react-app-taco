const organizationRepository = require("../../repository/organizationRepository/organizationRepository");
const {
  menuRepository_GetById,
  menuRepository_GetByQuery,
  menuRepository_Post,
  menuRepository_Update
} = require("../../repository/organizationRepository/organizationRepository");
const {
  handleError,
  validateName,
  validatePhoneNumber,
  sortType
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
    let errors = {}
    if (idParameter) {
      const result = await menuRepository_GetById(idParameter);
      if (!result) {
        errors = {
          ...errors,
          id: {
            message: "Not found results"
          }
        }
        throw { errors }
      }
      return {
        ...result,
        status: 200
      };
    }
  } catch (err) {
    const errFiltered = err.message ?
      { _id: err.message }
      :
      handleError(err)
    return new OrganizationError(errFiltered, 400);
  }
};

const menuService_GetByQuery = async (req) => {
  try {
    let errors = {}
    const { type, tittle, description, page = 1, sort = "asc", maxPage = 5 } = req.body;
    if (!sortType[sort]) {
      errors = {
        ...errors,
        sort: {
          message: "Allowed values : [asc, desc]."
        }
      }
    }
    if (page <= 0) {
      errors = {
        ...errors,
        page: {
          message: "Page number must be greater than zero."
        }
      }
    }
    if (maxPage <= 0) {
      errors = {
        ...errors,
        maxPage: {
          message: "MaxPage must be greater than zero."
        }
      }
    }
    let buildQuery = {
      $or: [{}]
    }
    if (description) {
      buildQuery["$or"].push({ description: { '$regex': description } });
    }
    if (tittle) {
      buildQuery["$or"].push({ tittle: { '$regex': tittle } });
    }
    if (type) {
      buildQuery["$or"].push({ type: type });
    }

    if (Object.keys(errors).length == 0) {
      const result = await menuRepository_GetByQuery(buildQuery, page, sortType[sort], maxPage);
      return {
        batchSize: result.length,
        resultSet: result,
        status: 200
      }
    } else {
      throw { errors };
    }
  } catch (err) {
    return new OrganizationError(handleError(err), 400);
  }
};

const menuService_Update = async (id, menu) => {
  try {
    const { type, tittle, description, price } = menu;
    let errors = {}
    let query = {}
    if (type)
      query = {
        ...query,
        type: type
      }
    if (tittle)
      query = {
        ...query,
        tittle: tittle
      }
    if (description)
      query = {
        ...query,
        description: description
      }
    if (price)
      query = {
        ...query,
        price: Number(price)
      }

    if (query !== null) {
      const result = await menuRepository_Update(id, query);
      return {
        ...result,
        // nModified: 1,
        status: 200
      };
    } else {
      errors = {
        ...errors,
        empty: {
          message : 'There is not uptate field.'
        }
      }
      throw {
        errors
      }
    }

  } catch (err) {
    return new OrganizationError(handleError(err), 400);
  }
}

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
  menuService_Update
};
