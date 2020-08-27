var jwt = require('jsonwebtoken');
const Error = require('../../errors/classes/Error');
const authService = require('../../services/authServices/authService');

const validateResult = (result, res) => {
    if (result instanceof Error) {
        const { status, ...data } = result.toJson();
        res.status(status).send(data);
    } else {
        const { status, ...data } = result;
        var token = jwt.sign(data, process.env.SEED, { expiresIn: Number(process.env.CADUCIDAD_TOKEN) });
        res.cookie('jwt', token, { httpOnly: true, maxAge: Number(process.env.CADUCIDAD_TOKEN) * 1000 });
        res.status(status).send(data);
    }
}

module.exports = {
    signup_post: async (req, res) => {
        const result = await authService.signup_post(req.body);
        validateResult(result, res);
    },
    signup_get: (req, res) => {
        res.send('signup get');
    }
}