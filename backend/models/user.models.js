// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  subscription: {
    type: String,
    enum: ['Basic', 'Standard', 'Premium'],
    default: 'Basic'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;


