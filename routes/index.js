const router = require('express').Router();
const userRoutes = require('./usersRoutes/userRoutes');
const authRoutes = require('./authRoutes/authRoutes');

router.use(userRoutes);
router.use('/auth', authRoutes);

module.exports = router;