const router = require('express').Router();
const { menuController_Post, menuController_Get } = require('../../api/oraganizationController/organizationController');

router.post('/menu', menuController_Post);
router.get('/menu/:id', menuController_Get);
// router.post('/menu', menuController_Post);

module.exports = router;