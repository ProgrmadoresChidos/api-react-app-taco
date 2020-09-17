const Error = require('../errors/classes/Error');

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

module.exports = {
  handleError,
  handleResult,
}