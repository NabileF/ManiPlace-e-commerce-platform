
// // const mongoose = require("mongoose");

// // const SubscriptionSchema = new mongoose.Schema({
// //   user_id: String,
// //   plan_id: String,
// //   plan_name: String,
// //   plan_price: Number,
// //   plan_features: [String],
// //   plan_access_level: String,
// //   subscription_date: String,
// // });

// // const SubscriptionModel = mongoose.model("Subscription", SubscriptionSchema);

// // module.exports = SubscriptionModel;


// const mongoose = require('mongoose');

// const subscriptionSchema = new mongoose.Schema({
//   planId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Plan',
//     required: [true, 'A subscription must have a plan ID'],
//   },
//   paymentMethod: {
//     type: String,
//     enum: ['creditCard', 'paypal', 'stripe'], 
//     required: [true, 'A subscription must have a payment method'],
//   },
//   paymentInfo: {
//     type: Object,
//     required: [true, 'A subscription must have payment information'],
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: [true, 'A subscription must belong to a user'],
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now(),
//   },
// });

// const Subscription = mongoose.model('Subscription', subscriptionSchema);

// module.exports = Subscription;
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  planId: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  paymentInfo: { type: Object, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: 'active' },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
