const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema ({
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },

  pricingModelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PricingModel',
    required: true
  },
  basePrice: {
    type: Number,
    required: true
  },
  discountTiers: [
    {
      orderQuantity: {
        type: Number,
        required: true
      },
      discountPercentage: {
        type: Number,
        required: true
      }
    }
  ],
  structuredOffer: {
    description: {
      type: String,
      required: true
    },
    details: {
      basePrice: {
        type: Number,
        required: true
      },
      tiers: [
        {
          quantity: {
            type: Number,
            required: true
          },
          discount: {
            type: Number,
            required: true
          }
        }
      ]
    }
  }
});

const Offer = mongoose.model('Offer', OfferSchema);
module.exports = Offer;
