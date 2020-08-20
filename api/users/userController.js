var router = require('express').Router();
var userRoutes = require('../../routes/users/userRoutes');
var user = require('../../services/users/userServices');

router.route("/usuario").get(user.saveUser);
router.route("/buscar").get(user.buscarUser);


module.exports = router; 