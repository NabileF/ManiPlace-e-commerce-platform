const express = require('express');
const { addProduct } = require('../controllers/productCtrl');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add', protect, addProduct);

module.exports = router;
