var router = require('express').Router();
const userController = require('../../api/users/userController');

router.route("/usuario").get(userController.saveUser);
router.route("/buscar").get(userController.buscarUser);

module.exports = router;