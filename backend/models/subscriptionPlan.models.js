const mongoose = require("mongoose");

const subscriptionPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["standard", "basic", "premium"],
  },
  features: [{ type: String }],
  price: { type: Number, required: true },
  accessLevel: { type: Number, required: true },
});

const SubscriptionPlan = mongoose.model("SubscriptionPlan", subscriptionPlanSchema);
module.exports = SubscriptionPlan;
