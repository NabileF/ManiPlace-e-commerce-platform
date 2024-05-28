
const express = require("express");
const router = express.Router();
const subscriptionController = require("../Controllers/subscriptionController");
const authMiddleware = require("../Middlewares/authMiddleware");

// Route to create a new subscription
router.post("/create", authMiddleware,subscriptionController.createSubscription);

module.exports = router;
