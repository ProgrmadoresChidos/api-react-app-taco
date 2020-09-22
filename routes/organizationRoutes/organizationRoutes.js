const router = require('express').Router();
const { menuController_Post, menuController_GetById, menuController_GetByQuery } = require('../../api/oraganizationController/organizationController');

router.post('/menu', menuController_Post);
router.get('/menu', menuController_GetByQuery);
router.get('/menu/:id', menuController_GetById);
// router.post('/menu', menuController_Post);

module.exports = router;

