const router = require('express').Router();
const userRoutes = require('./users/userRoutes');
const authRoutes = require('./authRoutes/authRoutes');

router.use(userRoutes);
router.use(authRoutes);

module.exports = router;