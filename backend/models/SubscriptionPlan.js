const mongoose = require("mongoose");

const SubscriptionPlanSchema = new mongoose.Schema({
  planId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  features: [{ type: String }],
  accessLevel: { type: String, required: true },
  trialDays: { type: Number, required: true },
});

module.exports = mongoose.model(
  "SubscriptionPlan",
  SubscriptionPlanSchema,
  "subscriptionPlan"
);
