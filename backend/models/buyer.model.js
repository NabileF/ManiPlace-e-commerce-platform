// models/Buyer.js
// models/buyerModel.js
const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String },
  userType: { type: String, default: 'buyer' },
  shippingAddress: { type: String },
  // Add other buyer fields as needed
});

module.exports = mongoose.model('Buyer', buyerSchema);
