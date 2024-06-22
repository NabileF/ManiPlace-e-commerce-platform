const PricingModel = require('../models/pricing.model');

// Create a new pricing model
const createPricingModel = async (req, res) => {
  try {
    const { name, description } = req.body;
    const pricingModel = new PricingModel({ name, description });
    await pricingModel.save();
    res.status(201).json(pricingModel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all pricing models
const getAllPricingModels = async (req, res) => {
  try {
    const pricingModels = await PricingModel.find();
    res.json(pricingModels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single pricing model by ID
const getPricingModelById = async (req, res) => {
  try {
    const pricingModel = await PricingModel.findById(req.params.id);
    if (pricingModel) {
      res.json(pricingModel);
    } else {
      res.status(404).json({ message: 'Pricing model not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a pricing model by ID
const updatePricingModel = async (req, res) => {
  try {
    const { name, description } = req.body;
    const pricingModel = await PricingModel.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
    if (pricingModel) {
      res.json(pricingModel);
    } else {
      res.status(404).json({ message: 'Pricing model not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a pricing model by ID
const deletePricingModel = async (req, res) => {
  try {
    const pricingModel = await PricingModel.findByIdAndDelete(req.params.id);
    if (pricingModel) {
      res.json({ message: 'Pricing model deleted' });
    } else {
      res.status(404).json({ message: 'Pricing model not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
    createPricingModel,
    getAllPricingModels,
    getPricingModelById,
    updatePricingModel,
    deletePricingModel
}