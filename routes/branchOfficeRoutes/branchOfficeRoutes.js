const router = require('express').Router();
const boController = require('../../api/branchOfficeController/branchOfficeController');

router.post('/branchOffice', boController.createBO);
router.get('/branchOffice', boController.getBOs);
router.get('/branchOffice/:id', boController.getBO);
router.put('/branchOffice/:id', boController.updateBO);
router.delete('/branchOffice/:id', boController.deleteBO);

module.exports = router;