// module.exports = router;
const express = require('express');
const { 
  getBulkOrders, 
  createBulkOrder, 
  batchProcessOrders, 
  updateOrderStatus, 
  cancelOrder, 
  rejectOrder, 
  confirmOrder 
} = require('../controllers/bulkOrderController');
const router = express.Router();

router.get('/', getBulkOrders);
router.post('/', createBulkOrder);
router.post('/batch-process', batchProcessOrders);
router.put('/:orderId/status', updateOrderStatus);
router.put('/:orderId/cancel', cancelOrder);
router.put('/:orderId/reject', rejectOrder);
router.put('/:orderId/confirm', confirmOrder); // New route for confirming order

module.exports = router;