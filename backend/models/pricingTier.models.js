const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PricingTierSchema = new Schema({
  minQuantity: {
    type: Number,
    required: true,
  },
  maxQuantity: {
    type: Number,
    required: true,
  },
  pricePerPiece: {
    type: Number,
    required: true,
  },
});

const PricingTier = mongoose.model(
  "PricingTier",
  PricingTierSchema,
  "pricingTier"
);

module.exports = PricingTier;