const router = require('express').Router();
const { menuController_Post, menuController_GetById, menuController_GetByQuery, menuController_Update } = require('../../api/organizationController/organizationController');
const organizationController = require('../../api/organizationController/organizationController');

router.post("/organization",organizationController.createOrganization);

/** 
 * CRUD Menu
 */
router.post('/menu', menuController_Post);
router.get('/menu', menuController_GetByQuery);
router.get('/menu/:id', menuController_GetById);
router.put('/menu/:id', menuController_Update);
/**
 * End of CRUD Menu
 */

module.exports = router;