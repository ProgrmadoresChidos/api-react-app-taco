const authService = require('../../services/authServices/authService');

module.exports = {
    signup_post: async (req, res) =>{
        const result = await authService.signup_post(req.body);
        const {status, ...data} = result;
        res.status(status).send(data);
    },
    signup_get: (req, res) =>{
        res.send('signup get');
    }
}