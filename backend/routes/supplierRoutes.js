const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");

// Start Trial
router.post("/:supplierId/trials/start", supplierController.startTrial);

// Stop Trial
router.post("/:supplierId/trials/stop", supplierController.stopTrial);

// Get Active Trials
router.get("/:supplierId/trials/active", supplierController.getActiveTrials);

module.exports = router;
