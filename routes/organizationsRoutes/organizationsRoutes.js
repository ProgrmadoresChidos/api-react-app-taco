const router = require('express').Router();
const organizationController = require('../../api/organizationController/organizationController');

router.post('/org', organizationController.createOrganization);

module.exports = router;