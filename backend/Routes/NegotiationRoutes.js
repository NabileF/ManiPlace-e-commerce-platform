const express = require('express');
const router = express.Router();
const negotiationController = require('../controllers/NegotiationController');

router.post('/', negotiationController.createNegotiation);
router.get('/', negotiationController.getAllNegotiations);
router.get('/:id', negotiationController.getNegotiationById);
router.put('/:id', negotiationController.updateNegotiation);
router.delete('/:id', negotiationController.deleteNegotiation);
router.post('/:id/messages', negotiationController.addMessageToNegotiation);
router.post('/:id/status', negotiationController.updateNegotiationStatus);

module.exports = router;
