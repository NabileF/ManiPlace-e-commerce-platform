const { SubscriptionPlan } = require('../models/subscription');
// const { User } = require('../models/user');

const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await SubscriptionPlan.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { getAllSubscriptions };

// exports.compareSubscriptions = async (req, res) => {
//   const { sub1, sub2 } = req.body;
//   try {
//     const subscription1 = await Subscription.findById(sub1);
//     const subscription2 = await Subscription.findById(sub2);
//     if (!subscription1 || !subscription2) {
//       return res.status(404).json({ message: 'Subscription not found' });
//     }
//     res.status(200).json({ subscription1, subscription2 });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };
const viewSubscriptionDetails = async (req, res) => {
  const name = req.params.name; // Extrait la propriété name de req.params
  console.log("Searching for subscription plan with name:", name);

  try {
    const subscription = await SubscriptionPlan.findOne({ name: name });
    if (!subscription) {
      return res.status(404).json({ message: 'Abonnement non trouvé' });
    }
    res.status(200).json({ message: 'Abonnement trouvé', subscription });
  } catch (error) {
    console.error("Error retrieving subscription:", error);
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
};


// session.controller.js


// viewSubscriptionDetails = async (req, res) => {
//   const name = req.body;
//   try {
   
//     const subscription = await SubscriptionPlan.find({ name: name});
//     if (!subscription) {
//       return res.status(404).json({ message: 'subscription not found' });
//     }
//     res.status(200).json({ message: 'Subscription ', subscription});
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };
module.exports = {
  getAllSubscriptions,
  // compareSubscriptions,
 viewSubscriptionDetails,
}
