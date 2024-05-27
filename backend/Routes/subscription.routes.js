const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

router.get('/subscriptions', subscriptionController.getAllSubscriptions);
router.post('/subscriptions/compare', subscriptionController.compareSubscriptions);
router.post('/subscriptions/choose', subscriptionController.chooseSubscription);

module.exports = router;