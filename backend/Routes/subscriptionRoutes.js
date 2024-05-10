
// subscriptionRoutes.js

const express = require('express');
const router = express.Router();
const subscriptionController = require('../Controllers/subscriptionController');

router.get('/:id/access-level', subscriptionController.getAccessLevel);
router.get('/:id/features', subscriptionController.getFeatures);
router.get('/:id/name', subscriptionController.getName);
router.get('/:id/plan-id', subscriptionController.getPlanId);
router.post('/', subscriptionController.createSubscription);

module.exports = router;

