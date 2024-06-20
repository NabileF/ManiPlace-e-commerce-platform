const express = require('express');
const router = express.Router();
const { registerSupplier, loginSupplier } = require('../controllers/authController');

router.post('/register/supplier', registerSupplier);
router.post('/login/supplier', loginSupplier);

module.exports = router;
