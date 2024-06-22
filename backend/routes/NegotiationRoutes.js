const express = require('express');
const router = express.Router();
const negotiationController = require('../controllers/NegotiationController');

router.post('/', negotiationController.createNegotiation);
router.get('/', negotiationController.getAllNegotiations);
router.get('/:id', negotiationController.getNegotiationById);
router.get('/:id/messages', negotiationController.getMessages);
router.put('/:id', negotiationController.updateNegotiation);
router.delete('/:id', negotiationController.deleteNegotiation);

module.exports = router;
