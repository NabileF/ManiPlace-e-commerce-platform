// controllers/subscriptionController.js
const SubscriptionPlan = require('../models/SubscriptionPlan');
const User = require('../models/User');



  const comparePlans = async (req, res) => {
    try {
      const { types, minPrice, maxPrice } = req.body; // Assuming types is an array of plan types, minPrice and maxPrice are numbers representing the price range

      let query = {};

      // Add type filter if types are specified
      if (types && types.length > 0) {
        query.name = { $in: types };
      }

      // Add price range filter if minPrice and maxPrice are specified
      if (minPrice !== undefined && maxPrice !== undefined) {
        query.price = { $gte: minPrice, $lte: maxPrice };
      }

      // Fetch plans based on query
      const plans = await SubscriptionPlan.find(query);
      
      if (plans.length === 0) {
        return res.status(404).json({ error: 'No plans found matching the criteria' });
      }

      res.json(plans);
    } catch (error) {
      console.error('Error comparing subscription plans:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
 
};




const getPlanById = async (req, res) => {
    try {
      const { planId } = req.params;

      // Retrieve the subscription plan by ID from the database
      const plan = await SubscriptionPlan.findById(planId);

      if (!plan) {
        return res.status(404).json({ error: 'Plan not found' });
      }

      res.json(plan);
    } catch (error) {
      console.error('Error fetching subscription plan:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
 
};

// controllers/subscriptionController.js


const subscriptionProcess = async (req, res) => {
    try {
      // Check if the user is logged in
      if (!req.user) {
        // If not logged in, redirect to login or create account page
        return res.redirect('/login');
      }

      // If logged in, get the subscription plan ID from request body
      const { planId } = req.body;

      // Retrieve the subscription plan details from the database
      const plan = await SubscriptionPlan.findById(planId);

      if (!plan) {
        return res.status(404).json({ error: 'Plan not found' });
      }

      // Perform subscription process (e.g., billing information, activation, etc.)
      // ...

      // Update user's subscription plan
      req.user.subscription = plan;
      await req.user.save();

      res.json({ message: 'Subscription successful', plan });
    } catch (error) {
      console.error('Error processing subscription:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = subscriptionController;


module.exports = {
  subscriptionProcess,
  getPlanById,
  comparePlans
};
   

