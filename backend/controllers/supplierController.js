const Supplier = require("../models/supplier");
const SubscriptionPlan = require("../models/SubscriptionPlan");

// Start Trial
exports.startTrial = async (req, res) => {
  const { supplierId } = req.params;
  const { planId } = req.body;

  try {
    const plan = await SubscriptionPlan.findOne({ planId });
    const supplier = await Supplier.findOne({ supplierId });

    if (plan && supplier) {
      const trialPlan = {
        planId,
        startDate: new Date(),
        isActive: true,
        endDate: new Date(Date.now() + plan.trialDays * 24 * 60 * 60 * 1000),
      };

      supplier.trialPlans.push(trialPlan);
      await supplier.save();
      res.status(200).json({ message: "Trial started successfully" });
    } else {
      res.status(400).json({ message: "Invalid supplier or plan" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Stop Trial
exports.stopTrial = async (req, res) => {
  const { supplierId } = req.params;
  const { planId } = req.body;

  try {
    const supplier = await Supplier.findOne({ supplierId });
    if (supplier) {
      const trialPlan = supplier.trialPlans.find(
        (plan) => plan.planId === planId
      );
      if (trialPlan) {
        trialPlan.isActive = false;
        trialPlan.endDate = new Date();
        await supplier.save();
        res.status(200).json({ message: "Trial stopped successfully" });
      } else {
        res.status(400).json({ message: "Trial plan not found" });
      }
    } else {
      res.status(400).json({ message: "Invalid supplier" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Active Trials
exports.getActiveTrials = async (req, res) => {
  const { supplierId } = req.params;

  try {
    const supplier = await Supplier.findOne({ supplierId });
    if (supplier) {
      const activeTrials = supplier.trialPlans.filter((plan) => plan.isActive);
      res.status(200).json(activeTrials);
    } else {
      res.status(400).json({ message: "Invalid supplier" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
