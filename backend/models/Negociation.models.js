const mongoose = require('mongoose');

const negotiationSchema = new mongoose.Schema({
  offerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Offer', required: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer', required: true },
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'BulkOrder', required: true },
  negotiationStatus: { type: String, enum: ['IN_PROGRESS', 'COMPLETED', 'REJECTED'], default: 'IN_PROGRESS' },
  proposedChanges: {
    discountPercentage: {
      type: Number,
      required: true,
    },
    paymentTerms: {
      type: String,
      required: true,
    },
  },
  messages: [
    {
       sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      content: String,
      timestamp: Date
    }
  ],
  agreementSummary: {
    discountPercentage: {
      type: Number,
      required: true,
    },
    orderQuantity: {
      type: Number,
      required: true,
    },
    paymentTerms: {
      type: String,
      required: true,
    },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Negotiation = mongoose.model('Negotiation', negotiationSchema);

module.exports = Negotiation ;

