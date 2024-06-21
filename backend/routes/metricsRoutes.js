const express = require('express');
const {
  calculateNumberOfOrders,
  calculateCustomerRetentionRate,
  calculateCustomerSatisfactionScore,
  generateEngagementMetricsReport,
} = require('../controllers/metricsController');

const router = express.Router();

router.get('/orders', calculateNumberOfOrders);
router.get('/retention-rate', calculateCustomerRetentionRate);
router.get('/satisfaction-score', calculateCustomerSatisfactionScore);
router.get('/report', generateEngagementMetricsReport);

module.exports = router;
