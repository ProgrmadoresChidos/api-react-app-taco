const router = require('express').Router();
const userRoutes = require('./usersRoutes/userRoutes');
const authRoutes = require('./authRoutes/authRoutes');
const orgRoutes = require('./organizationRoutes/organizationRoutes');

router.use(userRoutes);
router.use('/auth', authRoutes);
router.use('/org', orgRoutes);

module.exports = router;