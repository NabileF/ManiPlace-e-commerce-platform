const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductCategorySchema = new Schema({
  categoryId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  parentCategory: {
    type: Schema.Types.ObjectId,
    ref: "ProductCategory",
  },
});

const ProductCategory = mongoose.model(
  "ProductCategory",
  ProductCategorySchema,
  "productCategory"
);

module.exports = ProductCategory;