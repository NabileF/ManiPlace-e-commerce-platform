const mongoose = require('mongoose');

const BulkOrderSchema = new mongoose.Schema({
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer', required: true },

  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
  }],

  requestedDeliveryDate: { type: Date, required: true },
  status: { type: String, default: 'Pending' },
  cancellationReason: { type: String, required: false },
  deliveryTerms: { type: String, required: false },

  rejectionReason: { type: String, required: false },



});

module.exports = mongoose.model('BulkOrder', BulkOrderSchema);
