// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ['buyer', 'supplier'], required: true },
  // Add other user fields as needed
});

module.exports = mongoose.model('User', userSchema);

