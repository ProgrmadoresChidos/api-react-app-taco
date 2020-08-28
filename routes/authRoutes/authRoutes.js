const router = require('express').Router();
const authController = require('../../api/authController/authController');

router.route('/signup').post(authController.signup_post);

// login un post                     ** nestor
// agregar rol al modelo             ** Roberto  
// Middleware validar token          ** nestor
// verificar rol en el middleware    ** nestor
// ********* CRUD users por id
//      user/updateProfile/:id       ** JORJAIS UPDATE
//      user/deleteProfile/:id       ** Roberto

module.exports = router;