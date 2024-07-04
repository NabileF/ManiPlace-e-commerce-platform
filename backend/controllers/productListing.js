const express = require("express");
const Brand = require("../models/brand.models");
const ProductCategory = require("../models/productCategory.models");
const PricingTier = require("../models/pricingTier.models");
const Product = require("../models/product.models");
const ProductVariation = require("../models/productVariation.models");
const { Console } = require("console");

exports.AddNewListing = async (req, res) => {
  try {
    const {
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
    } = req.body;

    // Process pricing tiers
    const pricingTierDocs = [];
    for (const tier of pricingTiers) {
      const pricingTier = new PricingTier(tier);
      await pricingTier.save();
      pricingTierDocs.push(pricingTier._id);
    }

    // Process Variations
    const variantionsDocs = [];
    for (const Avariation of variations) {
      const variation = new ProductVariation(Avariation);
      await variation.save();
      variantionsDocs.push(variation._id);
    }

    // Process the brand
    const brandentered = new Brand(brand);
    await brandentered.save();

    //Process the Category
    let newCategoryEntered; //this will be initialized if the given Category is not already in the database , if not : we will only add the Category ID to the product

    const cat = await ProductCategory.findOne({
      categoryId: category.categoryId,
    });
    if (cat) {
      console.log(cat.categoryId);
    } else {
      newCategoryEntered = new ProductCategory(category);
      await newCategoryEntered.save();
    }

    const product = new Product({
      productId,
      name,
      description,
      images,
      pricingTiers: pricingTierDocs,
      stockQuantity,
      brand: brandentered._id,
      category: cat ? cat._id : newCategoryEntered._id, // so here if the category entered with the product already exist we will enter its id , if not we use the new Category
      sku,
      variations: variantionsDocs,
    });

    await product.save();

    res.status(201).json({ message: "Product created successfully", product });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating product", error: err.message });
  }
};