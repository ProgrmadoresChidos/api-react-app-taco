const Error = require('../errors/classes/Error');

const SCORE_LIMIT = {
  max: 5,
  min: 0,
};
const nameRegex = /^[a-zA-Z][a-zA-Z\s]*$/;
const phoneNumberRegex = /^([0-9]){3}(\s|-)?([0-9]){3}(\s|-)?([0-9]){4}$/;

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
};

const validateName = name => nameRegex.test(name);
const validatePhoneNumber = name => phoneNumberRegex.test(name);

const validateScore = score => {
  let valScore = score * 10;
  valScore = Math.trunc(valScore);
  valScore = valScore / 10;
  return valScore >= SCORE_LIMIT.min && valScore <= SCORE_LIMIT.max;
};

// Valida que todos los elementos de un array sean unicos
// TODO: Borrar este comentario: hice esta funcion y al final
// no la ocupe porque las keys de un objeto no se pueden repetir jajaja
const validateUniqueElements = data => {
  let elements = [...data];
  if (!elements.length) {
    return false;
  }
  for (const element of elements) {
    let elementsCopy = [...elements];
    const index = elementsCopy.indexOf(element);
    elementsCopy.splice(index, 1);
    if (!elementsCopy.every(el => el !== element)) {
      return false;
    }
  }
  return true;
};

// Formato de opneninHours
// keys = dias = 0 a 6 = domingo a sabado
// start y end = hora de 0 a 24
// {
//   "5": {
//     start: 20,
//     end: 23
//   },
//   "6": {
//     start: 18,
//     end: 23
//   }
// }
const validateOpeningHours = openingHours => {
  if (typeof openingHours === 'object' && !(openingHours instanceof Array)) {
    const keys = Object.keys(openingHours);
    if (!keys.length || keys.length > 7) {
      return false;
    }
    for (const key of keys) {
      let day = key.trim();
      day = Number(day);
      if (day !== 0 && !day) {
        return false;
      }
      if (day < 0 || day > 6) {
        return false;
      }
      const { start = null, end = null } = openingHours[key];
      if (start === null || end === null || typeof start !== 'number' || typeof start !== 'number') {
        return false;
      }
      if (start < 0 || start > 23 || end < 0 || end > 23 || start === end) {
        return false;
      }
    }
    return true;
  }
  return false;
};

const filterToRegex = filters => {
  return Object.keys(filters).reduce((newFilters, filter) => ({
    ...newFilters,
    [filter]: new RegExp(filters[filter], 'i'),
  }), {});
};

module.exports = {
  nameRegex,
  phoneNumberRegex,
  handleError,
  handleResult,
  validateName,
  validatePhoneNumber,
  validateScore,
  validateOpeningHours,
  filterToRegex,
}