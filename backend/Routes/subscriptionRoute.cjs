const express = require('express');
const router = express.Router();
const { viewSubscriptionPlans, createSubscriptionPlan, getSubscriptionPlanById, updateSubscriptionPlan, deleteSubscriptionPlan } = require('../controllers/subscriptionPlan.cjs'); 

// Routes
router.get('/', viewSubscriptionPlans);
router.post('/', createSubscriptionPlan);
router.get('/:id', getSubscriptionPlanById);
router.put('/:id', updateSubscriptionPlan);
router.delete('/:id', deleteSubscriptionPlan);

module.exports = router;
