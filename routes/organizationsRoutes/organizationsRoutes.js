const router = require('express').Router();
const { menuController_Post, menuController_GetById, menuController_GetByQuery } = require('../../api/organizationController/organizationController');
const organizationController = require('../../api/organizationController/organizationController');

router.post('/org', organizationController.createOrganization);

/** 
 * CRUD Menu
 */
router.post('/menu', menuController_Post);
router.get('/menu', menuController_GetByQuery);
router.get('/menu/:id', menuController_GetById);
/**
 * End of CRUD Menu
 */

module.exports = router;