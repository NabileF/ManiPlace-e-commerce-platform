const mongoose = require('mongoose');

const negotiationSchema = new mongoose.Schema({
  negotiationId: { type: String, required: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer', required: true },
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'BulkOrder', required: true },
  negotiationStatus: { type: String, enum: ['IN_PROGRESS', 'COMPLETED', 'REJECTED'], default: 'IN_PROGRESS' },
  messages: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Negotiation = mongoose.model('Negotiation', negotiationSchema);

module.exports = Negotiation ;