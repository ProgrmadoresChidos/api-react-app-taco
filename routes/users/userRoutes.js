// var user = require('../../services/users/userServices');

// router.route("/guardar", user.saveUser );

var router = require('express').Router();
const userController = require('../../api/users/userController');

router.route("/usuario").get(userController.saveUser);
router.route("/buscar").get(userController.buscarUser);

module.exports = router;