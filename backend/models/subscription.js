const mongoose = require('mongoose');

const subscriptionPlanSchema = new mongoose.Schema({
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "plan", required: false },
  name: { 
    type: String, 
    required: true, 
    enum: ['standard', 'basic', 'premium'] // Only these values allowed
  },
  features: [{ type: String }],
  price: { type: Number, required: true }, 
  accessLevel: { type: Number, required: true }, 
});

const SubscriptionPlan = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);

// Define unique plans with their own properties
const plans = [
  {
    name: 'standard',
    features: ['Feature 1', 'Feature 2'],
    price: 10,
    accessLevel: 1
  },
  {
    name: 'basic',
    features: ['Feature 1'],
    price: 5,
    accessLevel: 2
  },
  {
    name: 'premium',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    price: 20,
    accessLevel: 3
  }
];
async function initializePlans() {
  try {
    for (const planData of plans) {
      const existingPlan = await SubscriptionPlan.findOne({ name: planData.name });
      if (!existingPlan) {
        await SubscriptionPlan.create(planData);
      }
    }
    console.log("Plans initialized successfully.");
  } catch (error) {
    console.error("Error initializing plans:", error);
  }
}

// Call the initializePlans function when the script runs
initializePlans();


module.exports = { SubscriptionPlan, initializePlans};