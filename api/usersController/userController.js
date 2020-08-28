const userServices = require('../../services/usersService/userServices');

// controllers

module.exports = {
    saveUser: (req, res) => {
        const response = userServices.saveUser();// capa de negocios
        res.send(response);
    },
    buscarUser: (req, res) => {
        const response = userServices.buscarUser();
        res.send(response);
    },
}