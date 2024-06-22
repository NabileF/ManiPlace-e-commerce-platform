const Offer = require('../models/offer.models');


const createOffer = async (req, res) => {
    try {
        const { supplierId, pricingModelId, basePrice, discountTiers, structuredOffer } = req.body;
        const newOffer = new Offer({ supplierId, pricingModelId, basePrice, discountTiers, structuredOffer });
    await newOffer.save();
    res.status(201).json(newOffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find()
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id)
    if (!offer) return res.status(404).json({ error: 'Offer not found' });
    res.status(200).json(offer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const { supplierId, pricingModelId, basePrice, discountTiers, structuredOffer } = req.body;
    const offer = await Offer.findByIdAndUpdate(id, {supplierId, pricingModelId, basePrice, discountTiers, structuredOffer } , { new: true });
    if (!offer) return res.status(404).json({ error: 'Offer not found' });
    res.status(200).json(offer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) return res.status(404).json({ error: 'Offer not found' });
  res.status(200).send({ message: 'offer deleted successfully'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOffer,
  getAllOffers,
  getOfferById,
  updateOffer,
  deleteOffer
};
