const express = require('express');
const { getBulkOrders, createBulkOrder, batchProcessOrders, updateOrderStatus, cancelOrder, rejectOrder, confirmOrder} = require('../controllers/bulkOrderController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();


router.get( '/', protect, getBulkOrders)
router.post('/' ,protect, createBulkOrder);
router.post('/batch-process' ,protect, batchProcessOrders);
router.put('/:orderId/status' ,protect, updateOrderStatus);
router.put('/:orderId/cancel' ,protect, cancelOrder);
router.put('/:orderId/reject', protect, rejectOrder);
router.put('/:orderId/confirm', protect, confirmOrder); // New route for confirming order




module.exports = router;