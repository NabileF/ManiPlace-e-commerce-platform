const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subscriptionPlanId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubscriptionPlan', required: true },
  duration: { type: Number, default: 10 },  // duration in minutes
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date, default: null },
  paused: { type: Boolean, default: false }
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
