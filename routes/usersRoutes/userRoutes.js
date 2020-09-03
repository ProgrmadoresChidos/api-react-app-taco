var router = require('express').Router();
const userController = require('../../api/usersController/userController');
const { verifyToken, verifyAdminRole } = require('../../middlewares/authMiddlewares');

router.route("/registro").get(userController.saveUser);

// TODO: Checar si se deben quitar los middlewares de esta ruta: /buscar
router.route("/buscar").get([verifyToken, verifyAdminRole, userController.buscarUser]);

module.exports = router;