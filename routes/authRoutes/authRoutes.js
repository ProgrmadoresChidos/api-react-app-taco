const router = require('express').Router();
const authController = require('../../api/authController/authController');

router.route('/signup').get( authController.signup_get );
router.route('/signup').post( authController.signup_post );

module.exports = router;