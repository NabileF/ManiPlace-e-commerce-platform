const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');

const addProduct = asyncHandler(async (req, res) => {
  const { name, descriptions, images, pricingTiers, stockQuantity, brand, category, sku, variation } = req.body;

  const product = new Product({
    name,
    descriptions,
    images,
    pricingTiers,
    stockQuantity,
    brand,
    category,
    sku,
    variation,
    supplier: req.supplier._id,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

module.exports = { addProduct };
