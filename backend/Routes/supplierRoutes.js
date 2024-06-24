const express = require('express');
const router = express.Router();
const { updateSupplierProfile } = require('../controllers/supplierController');
const { protect } = require('../midllewares/authMiddleware');

router.put('/profile', protect, updateSupplierProfile);

module.exports = router;
