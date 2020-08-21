const userServices = require('../../services/users/userServices');

// controllers

module.exports = {
    saveUser: (req, res) => {
        // console.log(req);
        const response = userServices.saveUser();// capa de negocios
        res.send(response);
    },
    buscarUser: (req, res) => {
        const response = userServices.buscarUser();
        res.send(response);
    },
}