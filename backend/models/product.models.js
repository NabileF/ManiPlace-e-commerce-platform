const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  pricingTiers: [
    {
      type: Schema.Types.ObjectId,
      ref: "PricingTier",
    },
  ],
  stockQuantity: {
    type: Number,
    required: true,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "ProductCategory",
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  variations: [
    {
      type: Schema.Types.ObjectId,
      ref: "ProductVariation",
    },
  ],
});

const Product = mongoose.model("Product", ProductSchema, "product");

module.exports = Product;