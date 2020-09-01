const AuthError = require('../../errors/authErrors/authError');
const authRepository = require('../../repository/autRepository/authRepository');

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

module.exports = {
    signup_post: async (usuario) => {
        const passRegex = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/;
        try {
            let errors = null;
            const { password } = usuario;
            if (!password) {
                errors = {
                    ...errors,
                    'password': {
                        message: 'Please enter a password'
                    }
                }
            } else if (!passRegex.test(password)) {
                errors = {
                    ...errors,
                    'password': {
                        message: 'Please enter a valid password: at least 1 uppercase letter, 1 digit, 1 special character'
                    }
                }
            }
            if (errors === null) {
                const { _doc } = await authRepository.signup_post(usuario);
                const { password, _id, __v, ...data } = _doc
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
                user,
            }
        } catch (error) {
            const err = error.message ? error.message : handleError(error);
            return new AuthError(err, 400);
        }
    },
}