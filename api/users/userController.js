const userServices = require('../../services/users/userServices');

module.exports = {
    saveUser: (req, res) => {
        const response = userServices.saveUser();
        res.send(response);
    },
    buscarUser: (req, res) => {
        const response = userServices.buscarUser();
        res.send(response);
    },
}