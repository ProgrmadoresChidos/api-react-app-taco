const router = require('express').Router();
const authController = require('../../api/authController/authController');

router.route('/signup').post(authController.signup_post);

module.exports = router;