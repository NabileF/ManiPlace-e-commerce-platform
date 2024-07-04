const express = require('express');
const router = express.Router();
const { updateSupplierProfile } = require('../controllers/supplierController');
const { protect } = require('../middlewares/authMiddleware');

router.put('/profile', protect, updateSupplierProfile);

module.exports = router;
