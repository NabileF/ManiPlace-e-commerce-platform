const express = require("express");
const router = express.Router();
const controller = require("../controllers/subscription.controller");



router.post('/register', userController.registerUser);
router.post('/select-subscription', userController.selectSubscription);
router.post('/process-payment', userController.processPayment);

module.exports = router;