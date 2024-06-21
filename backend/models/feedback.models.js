const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  comment: { type: String, required: false },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
