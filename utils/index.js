const Error = require('../errors/classes/Error');

const nameRegex = /^[a-zA-Z][a-zA-Z\s]*$/;
const phoneNumberRegex = /^([0-9]){3}(\s|-)?([0-9]){3}(\s|-)?([0-9]){4}$/;
const sortType = { asc: 1, desc: -1 };

const handleError = (error) => {
  let errors = {}
  Object.keys(error).forEach(value => {
    if (value === "name") {
      errors = {
        "mongoDB": error.name,
        "code": error.code
      }
    } else if (value === "errors") {
      errors = Object.keys(error.errors).reduce((acc, key) =>
        ({
          ...acc,
          [key]: error.errors[key].message
        }), {})
    }
  })
  return errors;
};

const handleResult = (result, res) => {
  if (result instanceof Error) {
    const { status, ...data } = result.toJson();
    res.status(status).send(data);
  } else {
    const { status, ...data } = result;
    res.status(status).send(data);
  }
}

const validateName = name => nameRegex.test(name);
const validatePhoneNumber = name => phoneNumberRegex.test(name);

module.exports = {
  nameRegex,
  phoneNumberRegex,
  sortType,
  handleError,
  handleResult,
  validateName,
  validatePhoneNumber,
}