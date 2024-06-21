const mongoose = require('mongoose');

const BulkOrderSchema = new mongoose.Schema({
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  orderDetails: [{ productName: String, quantity: Number }],
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer', required: true },
  requestedDeliveryDate: { type: Date, required: true },
  status: { type: String, default: 'Pending' },
  cancellationReason: { type: String, required: false },
  pricing: { type: Number, required: false },
  deliveryTerms: { type: String, required: false },
  workflowStages: [{
    stage: { type: String, required: true },
    completed: { type: Boolean, default: false },
    updatedAt: { type: Date, default: Date.now },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }
  }],
  negotiationHistory: [{
    date: { type: Date, default: Date.now },
    changes: { type: Object, required: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true }
  }],
  rejectionReason: { type: String, required: false }

});

module.exports = mongoose.model('BulkOrder', BulkOrderSchema);
