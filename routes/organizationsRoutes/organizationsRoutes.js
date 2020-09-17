const router = require('express').Router();
const organizationController = require('../../api/organizationController/organizationController');

router.post('/organization', organizationController.createOrganization);

module.exports = router;