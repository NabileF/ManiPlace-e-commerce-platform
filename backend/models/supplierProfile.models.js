const mongoose = require('mongoose');

const supplierProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  identification: { type: String, required: true },
  manufacturingCapabilities: { type: String },
  products: { type: String },
  wholesaleOperations: { type: String },
  distributionChannels: { type: String },
  availableInventory: { type: String },
});

const SupplierProfile = mongoose.model('SupplierProfile', supplierProfileSchema);

module.exports = SupplierProfile;