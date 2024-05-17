// controllers/subscriptionController.js
const Subscription = require('../models/subscription');

exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.compareSubscriptions = async (req, res) => {
  const { sub1, sub2 } = req.body;
  try {
    const subscription1 = await Subscription.findById(sub1);
    const subscription2 = await Subscription.findById(sub2);
    if (!subscription1 || !subscription2) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.status(200).json({ subscription1, subscription2 });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.chooseSubscription = async (req, res) => {
  const { userId, subscriptionId } = req.body;
  try {
    const user = await User.findById(userId);
    const subscription = await Subscription.findById(subscriptionId);
    if (!user || !subscription) {
      return res.status(404).json({ message: 'User or subscription not found' });
    }
    user.subscription = subscription;
    await user.save();
    res.status(200).json({ message: 'Subscription chosen successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
