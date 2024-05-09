const SubscriptionPlan = require('../model/subscription.cjs');
//view all subscriptionPlan
const viewSubscriptionPlans = async (req, res) => {
  try {
    const subscriptionPlans = await SubscriptionPlan.find();

    if (!subscriptionPlans || subscriptionPlans.length === 0) {
      return res.status(404).json({ message: 'No subscription plans found' });
    }

    res.status(200).json({ subscriptionPlans });
  } catch (err) {
    console.error('Error fetching subscription plans:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};
//add a new subscriptionplan
const createSubscriptionPlan = async (req, res) => {
  try {
    const { planId, name, features, price, accessLevel } = req.body;
    const newSubscriptionPlan = new SubscriptionPlan({
      planId,
      name,
      features,
      price,
      accessLevel,
    });
    const savedSubscriptionPlan = await newSubscriptionPlan.save();
    res.status(201).json(savedSubscriptionPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//getbyId
const getSubscriptionPlanById = async (req, res) => {
  try {
    const subscriptionPlan = await SubscriptionPlan.findById(req.params.id);
    if (!subscriptionPlan) {
      return res.status(404).json({ message: 'Subscription plan not found' });
    }
    res.status(200).json(subscriptionPlan);
  } catch (error) {
    console.error('Error fetching subscription plan by ID:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
//update 
const updateSubscriptionPlan = async (req, res) => {
  try {
    const { planId, name, features, price, accessLevel } = req.body;
    const updatedSubscriptionPlan = await SubscriptionPlan.findByIdAndUpdate(req.params.id, {
      planId,
      name,
      features,
      price,
      accessLevel,
    }, { new: true });
    if (!updatedSubscriptionPlan) {
      return res.status(404).json({ message: 'Subscription plan not found' });
    }
    res.status(200).json(updatedSubscriptionPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//delete
const deleteSubscriptionPlan = async (req, res) => {
  try {
    const deletedSubscriptionPlan = await SubscriptionPlan.findByIdAndDelete(req.params.id);
    if (!deletedSubscriptionPlan) {
      return res.status(404).json({ message: 'Subscription plan not found' });
    }
    res.status(200).json({ message: 'Subscription plan deleted successfully' });
  } catch (error) {
    console.error('Error deleting subscription plan:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  viewSubscriptionPlans,
  createSubscriptionPlan,
  getSubscriptionPlanById,
  updateSubscriptionPlan,
  deleteSubscriptionPlan
};
