const router = require('express').Router();
const userRoutes = require('./usersRoutes/userRoutes');
const authRoutes = require('./authRoutes/authRoutes');
const organizationRoutes = require('./organizationsRoutes/organizationsRoutes');
const boRoutes = require('./branchOfficeRoutes/branchOfficeRoutes');

router.use(userRoutes);
router.use('/auth', authRoutes);
router.use(organizationRoutes);
router.use(boRoutes);

module.exports = router;