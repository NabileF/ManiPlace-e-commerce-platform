const express = require('express');
const { getBulkOrders, createBulkOrder, batchProcessOrders, updateOrderStatus, cancelOrder, negotiateOrder, updateWorkflowStage, rejectOrder} = require('../controllers/bulkOrderController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();


router.get( '/', protect, getBulkOrders)
router.post('/' ,protect, createBulkOrder);
router.post('/batch-process' ,protect, batchProcessOrders);
router.put('/:orderId/status' ,protect, updateOrderStatus);
router.put('/:orderId/cancel' ,protect, cancelOrder);
router.put('/:orderId/reject', protect, rejectOrder);



module.exports = router;
