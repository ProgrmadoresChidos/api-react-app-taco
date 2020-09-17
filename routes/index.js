const router = require('express').Router();
const userRoutes = require('./usersRoutes/userRoutes');
const authRoutes = require('./authRoutes/authRoutes');
const organizationRoutes = require('./organizationsRoutes/organizationsRoutes');

router.use(userRoutes);
router.use('/auth', authRoutes);
router.use(organizationRoutes);

module.exports = router;