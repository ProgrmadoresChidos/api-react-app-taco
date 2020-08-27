var jwt = require('jsonwebtoken');
const Error = require('../../errors/classes/Error');
const authService = require('../../services/authServices/authService');

const validateResult = (result, res) => {
    if (result instanceof Error) {
        const { status, ...data } = result.toJson();
        res.status(status).send(data);
    } else {
        const { status, ...data } = result;
        const expTime = process.env.CADUCIDAD_TOKEN;
        // console.log(expTime)
        var token = jwt.sign(data, process.env.SEED, { expiresIn: 60 * 60 });
        res.cookie('jwt', token, { httpOnly: true, maxAge: expTime * 1000 });
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