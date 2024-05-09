const express = require('express');
const router = express.Router();
const { viewSubscriptionPlans, updateSubscriptionPlan,  downgradeSubscriptionPlan,
} = require('../controllers/subscriptionPlan.cjs'); 

// Routes
router.get('/', viewSubscriptionPlans);
router.put('/:id', updateSubscriptionPlan);
router.put('/:id',   downgradeSubscriptionPlan,
);

module.exports = router;
