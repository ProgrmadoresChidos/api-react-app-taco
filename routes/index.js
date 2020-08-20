const router = require('express').Router();
const userRoutes = require('./users/userRoutes');

router.use(userRoutes);

module.exports = router;