const router = require('express').Router();
const authController = require('../../api/authController/authController');

router.route('/signup').post(authController.signup_post);
router.post('/login', authController.login_post);

module.exports = router;