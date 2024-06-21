const express = require('express');
const router = express.Router();
const pricingModelController = require('../controllers/PricingModelController');

// Create a new pricing model
router.post('/', pricingModelController.createPricingModel);

// Get all pricing models
router.get('/', pricingModelController.getAllPricingModels);

// Get a single pricing model by ID
router.get('/:id', pricingModelController.getPricingModelById);

// Update a pricing model by ID
router.put('/:id', pricingModelController.updatePricingModel);

// Delete a pricing model by ID
router.delete('/:id', pricingModelController.deletePricingModel);

module.exports = router;
