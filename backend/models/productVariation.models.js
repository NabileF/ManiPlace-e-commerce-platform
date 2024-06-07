const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductVariationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
  },
});

const ProductVariation = mongoose.model(
  "ProductVariation",
  ProductVariationSchema,
  "productVariation"
);

module.exports = ProductVariation;