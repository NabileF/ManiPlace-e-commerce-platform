const Supplier = require('../models/supplier.models');
const asyncHandler = require('express-async-handler');

// Get supplier profile
const getProfile = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.supplier._id).select('-password');
  if (supplier) {
    res.json(supplier);
  } else {
    res.status(404);
    throw new Error('Supplier not found');
  }
});

// Update supplier profile
const updateProfile = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.supplier._id);

  if (supplier) {
    supplier.identificationType = req.body.identificationType || supplier.identificationType;
    supplier.manufacturingCapabilities = req.body.manufacturingCapabilities || supplier.manufacturingCapabilities;
    supplier.products = req.body.products || supplier.products;
    supplier.wholesaleOperations = req.body.wholesaleOperations || supplier.wholesaleOperations;
    supplier.distributionChannels = req.body.distributionChannels || supplier.distributionChannels;
    supplier.availableInventory = req.body.availableInventory || supplier.availableInventory;

    const updatedSupplier = await supplier.save();
    res.json(updatedSupplier);
  } else {
    res.status(404);
    throw new Error('Supplier not found');
  }
});

module.exports = { getProfile, updateProfile };
