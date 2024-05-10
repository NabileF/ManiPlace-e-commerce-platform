
const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  user_id: String,
  plan_id: String,
  plan_name: String,
  plan_price: Number,
  plan_features: [String],
  plan_access_level: String,
  subscription_date: String,
});

const SubscriptionModel = mongoose.model("Subscription", SubscriptionSchema);

module.exports = SubscriptionModel;
