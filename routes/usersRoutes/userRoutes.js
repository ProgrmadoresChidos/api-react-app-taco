var router = require('express').Router();
const userController = require('../../api/usersController/userController');

router.route("/registro").get(userController.saveUser);
router.route("/buscar").get(userController.buscarUser);

module.exports = router;