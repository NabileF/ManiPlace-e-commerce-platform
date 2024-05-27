const mongoose = require('mongoose');
const { Schema } = mongoose;
const RoleSchema = require('./role'); // Assuming role.js is in the same folder
const TaskSchema = require('./task'); // Assuming task.js is defined similarly

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  password: { type: String, required: true },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String }
  },
  phoneNumber: { type: String, match: /^\+?[1-9]\d{1,14}$/ },
  roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }], // A user can have multiple roles
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }], // A user can have multiple tasks
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Middleware to update the updated_at field
UserSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('User', UserSchema);
