const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema ({
  offerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer',
    required: true
  },
  negotiationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Negotiation',
    required: true
  },
  agreedTerms: {
    discountPercentage: {
      type: Number,
      required: true
    },
    orderQuantity: {
      type: Number,
      required: true
    },
    paymentTerms: {
      type: String,
      required: true
    }
  },
  contractDocumentUrl: {
    type: String,
    required: true
  },
  digitalSignatures: {
    supplierSignatureUrl: {
      type: String,
      required: true
    },
    buyerSignatureUrl: {
      type: String,
      required: true
    }
  },
 
});

const Contract = mongoose.model('Contract', ContractSchema);
module.exports = Contract;
