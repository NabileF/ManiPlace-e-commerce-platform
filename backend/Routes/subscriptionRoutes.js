const express = require('express');
const router = express.Router();
const subscription = require('../controllers/subscriptionPlan'); 

// Routes

router.post('/subscription',subscription.addSubscription)
router.get('/subscriptions',subscription.getAllSubscriptions)
router.get('/subscription/:id', subscription.viewSubscriptionDetails);
router.put('/subscription/:id', subscription.updateSubscriptionPlan);
router.delete('/subscription/:id', subscription.deleteSubscriptionPlan);
router.post('/trial/start',subscription.startTrialSession)
router.post('/trial/end/:sessionId',subscription.endTrialSession)
router.post('/subscribe/:id',subscription.subscribeToPlan),
router.put('/upgrade',subscription.upgrade),
router.put('/downgrade',subscription.downgrade),

module.exports = router;