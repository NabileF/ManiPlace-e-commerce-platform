const express = require('express');
const router = express.Router();
const trialsessionController = require('../controllers/trialSubscription.controllers');

router.get('/trialSubscription', trialsessionController.startTrialSession);
// router.post('/subscriptions/compare', subscriptionController.compareSubscriptions);
// router.post('/subscriptions/choose', subscriptionController.chooseSubscription);

module.exports = router;
