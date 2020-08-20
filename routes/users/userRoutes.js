var router = require('express').Router();
var user = require('../../services/users/userServices');

router.route("/guardar", user.saveUser );


exports.module = router;