const express = require('express');
const router = express.Router();

const conductorCtrl = require('../controllers/Conductor.controller')

router.get('/', conductorCtrl.getConductores);
router.post('/', conductorCtrl.createConductor);
router.get('/:id', conductorCtrl.getConductor);
router.put('/:id', conductorCtrl.editConductor);
router.delete('/:id', conductorCtrl.deleteConductor);

module.exports = router;