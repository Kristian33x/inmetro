const express = require('express');
const router = express.Router();

const busCtrl = require('../controllers/Bus.controller')

router.get('/', busCtrl.getBuses);
router.post('/', busCtrl.createBus);
router.get('/:id', busCtrl.getBus);
router.put('/:id', busCtrl.editBus);
router.delete('/:id', busCtrl.deleteBus);

module.exports = router;