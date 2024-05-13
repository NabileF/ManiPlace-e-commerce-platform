// routes/subscriptionRoutes.js
const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

// Define routes
router.post('/compare', subscriptionController.comparePlans);
router.post('/subscribe', subscriptionController.subscriptionProcess);
router.get('/plans/:planId', subscriptionController.getPlanById);

module.exports = router;

