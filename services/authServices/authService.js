const { isEmail } = require('validator');

const AuthError = require('../../errors/authErrors/authError');
const authRepository = require('../../repository/autRepository/authRepository');
/*
    model requested from validation schema.
    {
        errors: {
            password: {
                message: 'This is a message'
            },
            email: {
                message: 'This is a message'
            }
        }
    }
*/

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
}

/**
 * 
 * @param {Field name} fieldName 
 * @param {value to validate} value 
 * @param {Regular expression} regex 
 * @param {If the value has a minimun length} minlength 
 * @param {Message when is require the field} messageRequire 
 * @param {Message when is not matching the regex} messageAlt 
 */
const isValid = (fieldName, value, regex, minlength = 0, messageRequire = 'This field is required', messageAlt = 'regext patter doesn´t match') => {
    let error = null;
    if (minlength > 0) {
        value.length < minlength ?
            error = {
                ...error,
                [fieldName]: {
                    message: `Minimum length is ${minlength} characters.`
                }
            }
            : null
    }
    if (value.length === 0) {
        error = {
            ...error,
            [fieldName]: {
                message: messageRequire
            }
        }
    } else if (typeof (regex) === 'function') {
        if (!regex(value)) {
            error = {
                ...error,
                [fieldName]: {
                    message: messageAlt
                }
            }
        }
    } else if (!regex.test(value)) {
        error = {
            ...error,
            [fieldName]: {
                message: messageAlt
            }
        }
    }
    return error;
}


module.exports = {
    signup_post: async (usuario) => {
        const passRegex = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/;
        const nameRegex = /^[a-zA-Z][a-zA-Z\s]*$/
        try {
            let errors = null;
            let error = [];
            const { name = '', lastName = '', email = '', password = '' } = usuario;
            error.push(isValid('name', name, nameRegex, 0, 'Please enter a name', 'Please just enter letters'));
            error.push(isValid('lastName', lastName, nameRegex, 0, 'Please enter your last name', 'Please just enter letters'));
            error.push(isValid('email', email, isEmail, 0, 'Please enter an email', 'Please enter a valid email'))
            error.push(isValid('password', password, passRegex, 8, 'Please enter a password', 'Please enter a valid password: at least 1 uppercase letter, 1 digit, 1 special character'));
            const errorFiltered = error.filter(err => err); // remove all the null objects
            errors = errorFiltered.length > 0 ?
                errorFiltered
                    .reduce((obj, key) => ({    // concat the errors in one object
                        ...obj,
                        ...key
                    }), {})
                : null;

            if (errors === null) {
                // const { _doc } = 
                const { __v, ...data } = await authRepository.signup_post(usuario);
                return {
                    ...data,
                    status: 201
                }
            } else {
                throw { errors };
            }
        } catch (err) {
            return new AuthError(
                handleError(err),
                400
            )
        }
    },
    login_post: async (email, password) => {
        try {
            let errors = {};
            if (!email) {
                errors = {
                    email: {
                        message: 'Invalid email',
                    }
                }
            }

            if (!password) {
                errors = {
                    ...errors,
                    password: {
                        message: 'Invalid password',
                    }
                }
            }
            if (Object.keys(errors).length) {
                throw { errors };
            }

            const { error = null, user } = await authRepository.login_post(email, password);
            if (error) {
                throw error;
            }
            return {
                status: 200,
                ...user,
            }
        } catch (error) {
            const err = error.message ? error.message : handleError(error);
            return new AuthError(err, 400);
        }
    },
}