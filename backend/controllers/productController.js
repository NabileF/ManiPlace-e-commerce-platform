// productController.js
const mongoose = require('mongoose');
const Product = require('../models/product.models');

// Hide a product
const hideProduct = async (req, res) => {
  const { productId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.hidden = true;
    await product.save();

    res.json({ message: 'Product successfully hidden from marketplace' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to change product visibility. Please try again later.' });
  }
};

// Unhide a product
const unhideProduct = async (req, res) => {
  const { productId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stockQuantity <= 0) {
      return res.status(400).json({ message: 'Product cannot be made visible with zero stock quantity' });
    }

    product.hidden = false;
    await product.save();

    res.json({ message: 'Product successfully made visible on marketplace' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to change product visibility. Please try again later.' });
  }
};
const createProduct = async (req, res) => {
    const { productId, name, description, images, pricingTiers, stockQuantity, brand, category, sku, variations } = req.body;
  
    try {
      // Vérifiez si les ObjectIds sont valides et existent
      const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
  
      if (!isValidObjectId(brand) || !isValidObjectId(category) || !pricingTiers.every(isValidObjectId) || !variations.every(isValidObjectId)) {
        return res.status(400).json({ message: 'Invalid ObjectId provided' });
      }
  
      const newProduct = new Product({
        productId,
        name,
        description,
        images,
        pricingTiers,
        stockQuantity,
        brand,
        category,
        sku,
        variations,
      });
  
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Unable to create product. Please try again later.' });
    }
  };
  
  const getProduct = async (req, res) => {
    const { productId } = req.params;
  
    try {
      const product = await Product.findById(productId).populate('pricingTiers brand category variations');
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Unable to fetch product. Please try again later.' });
    }
  };
  const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const updates = req.body;
  
    try {
      const product = await Product.findByIdAndUpdate(productId, updates, { new: true });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Unable to update product. Please try again later.' });
    }
  };
  
  const deleteProduct = async (req, res) => {
    const { productId } = req.params;
  
    try {
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product successfully deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Unable to delete product. Please try again later.' });
    }
  };
  const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find().populate('pricingTiers brand category variations');
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Unable to fetch products. Please try again later.' });
    }
  };
  
module.exports = { hideProduct, unhideProduct , createProduct, getProduct ,updateProduct , deleteProduct , getAllProducts};