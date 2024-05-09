const mongoose = require('mongoose');

const subscriptionPlanSchema = new mongoose.Schema({
  planId: { type: String, required: true },
  name: { type: String, required: true },
  features: [{ type: String }],
  price: { type: Number, required: true }, 
  accessLevel: { type: Number, required: true }, 
});

const SubscriptionPlan = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);

module.exports = SubscriptionPlan;
