// var router = require('express').Router();
// var userRoutes = require('../../routes/users/userRoutes');
// var user = require('../../services/users/userServices');

// router.route("/usuario").get(user.saveUser);
// router.route("/buscar").get(user.buscarUser);


// module.exports = router; 

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