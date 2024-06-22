const express = require('express');
const router = express.Router();
const contractController = require('../controllers/ContractController');

// Create a new contract
router.post('/', contractController.createContract);

// Get all contracts
router.get('/', contractController.getAllContracts);

// Get a single contract by ID
router.get('/:id', contractController.getContractById);

// Update a contract by ID
router.put('/:id', contractController.updateContract);

// Delete a contract by ID
router.delete('/:id', contractController.deleteContract);

module.exports = router;
