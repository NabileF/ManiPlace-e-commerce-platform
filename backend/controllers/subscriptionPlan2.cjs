// const SubscriptionPlan = require('../model/subscription.cjs');
// //view all subscriptionPlan
// const viewSubscriptionPlans = async (req, res) => {
//   try {
//     const subscriptionPlans = await SubscriptionPlan.find();

//     if (!subscriptionPlans || subscriptionPlans.length === 0) {
//       return res.status(404).json({ message: 'No subscription plans found' });
//     }

//     res.status(200).json({ subscriptionPlans });
//   } catch (err) {
//     console.error('Error fetching subscription plans:', err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// //upgrade 
// const updateSubscriptionPlan = async (req, res) => {
//   try {
//     const {  name, features, price, accessLevel } = req.body;
//     const updatedSubscriptionPlan = await SubscriptionPlan.findByIdAndUpdate(req.params.id, {
//       name,
//       features,
//       price,
//       accessLevel,
//     }, { new: true });
//     if (!updatedSubscriptionPlan) {
//       return res.status(404).json({ message: 'Subscription plan not found' });
//     }
//     res.status(200).json(updatedSubscriptionPlan);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
// //downgrade 
// const downgradeSubscriptionPlan = async (req, res) => {
//   try {
    
//     const { name, features, price, accessLevel } = req.body;
    
//     // find the subscription plan and update it
//     const updatedSubscriptionPlan = await SubscriptionPlan.findByIdAndUpdate(
//       req.params.id,
//       {
//         name,
//         features,
//         price,
//         accessLevel,
//       },
//       { new: true }
//     );

//     // Check if the subscription plan exists
//     if (!updatedSubscriptionPlan) {
//       return res.status(404).json({ message: 'Subscription plan not found' });
//     }

//     // Return the updated subscription plan
//     res.status(200).json(updatedSubscriptionPlan);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };



// module.exports = {
//   viewSubscriptionPlans,
//   updateSubscriptionPlan,
//   downgradeSubscriptionPlan,
// };