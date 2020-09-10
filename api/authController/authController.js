var jwt = require('jsonwebtoken');
const Error = require('../../errors/classes/Error');
const authService = require('../../services/authServices/authService');

const validateResult = (result, res) => {
    if (result instanceof Error) {
        const { status, ...data } = result.toJson();
        res.status(status).send(data);
    } else {
        const { status, password, ...data } = result;
        var token = jwt.sign(data, process.env.SEED, { expiresIn: Number(process.env.CADUCIDAD_TOKEN) });
        const secureFlag = process.env.NODE_ENV === 'dev'? false: true;
        res.cookie('jwt', token,
            {
                httpOnly: true,
                path: '/',
                hostOnly: false,
                secure: secureFlag,
                sameSite: true,
                maxAge: Number(process.env.CADUCIDAD_TOKEN) * 1000
            }
        );
        res.status(status).send(data);
    }
}

module.exports = {
    signup_post: async (req, res) => {
        const result = await authService.signup_post(req.body);
        validateResult(result, res);
    },
    login_post: async (req, res) => {
        const result = await authService.login_post(req.body.email, req.body.password);
        validateResult(result, res);
    },
}