const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  descriptions: { type: String, required: true },
  images: [{ type: String, required: true }],
  pricingTiers: [
    {
      minQuantity: { type: Number, required: true },
      maxQuantity: { type: Number, required: true },
      pricePerPiece: { type: Number, required: true },
    }
  ],
  stockQuantity: { type: Number, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  sku: { type: String, required: true },
  variation: { type: String, required: true },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
