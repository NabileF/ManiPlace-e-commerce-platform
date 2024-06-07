const express = require('express');
const router = express.Router();
const {createSupplier, loginSupplierCtrl, getAllSuppliers, getaSupplier} = require('../controllers/supplierCtrl');

router.post('/register', createSupplier);
router.post('/login', loginSupplierCtrl);
router.get('/all-suppliers', getAllSuppliers);
router.get('/:id', getaSupplier);
router.post('/identify', identifySupplier);

module.exports = router; 

