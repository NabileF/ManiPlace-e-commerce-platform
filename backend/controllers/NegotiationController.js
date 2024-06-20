const Negotiation = require('../models/Negociation.models');

const createNegotiation = async (req, res) => {
    try {
        const { offerId, buyerId, supplierId, order, negotiationStatus, proposedChanges, messages, agreementSummary } = req.body;
        const newNegotiation = new Negotiation({ offerId, buyerId, supplierId, order, negotiationStatus, proposedChanges, messages, agreementSummary });
    await newNegotiation.save();
    res.status(201).json(newNegotiation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllNegotiations = async (req, res) => {
  try {
    const negotiations = await Negotiation.find();
    if (!negotiations) return res.status(404).json({ error: 'Theres no negotiation' });
    res.status(200).json(negotiations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNegotiationById = async (req, res) => {
  try {
    const negotiation = await Negotiation.findById(req.params.id);
    if (!negotiation) return res.status(404).json({ error: 'Negotiation not found' });
    res.status(200).json(negotiation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateNegotiation = async (req, res) => {
  try {    
     const { id } = req.params;
     const { offerId, buyerId, supplierId, order, negotiationStatus, proposedChanges, messages, agreementSummary} = req.body;
    const negotiation = await Negotiation.findByIdAndUpdate(id , {offerId, buyerId, supplierId, order, negotiationStatus, proposedChanges, messages, agreementSummary }, { new: true });
    if (!negotiation) 
    return res.status(404).json({ error: 'Negotiation not found' });
    res.status(200).json(negotiation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addMessage = async (req, res) => {
  try {
    const { sender, senderType, content } = req.body;

    const negotiation = await Negotiation.findById(req.params.id);
    if (!negotiation) {
      return res.status(404).json({ message: 'Negotiation not found' });
    }

    negotiation.messages.push({ sender, senderType, content, timestamp: new Date() });
    negotiation.updatedAt = Date.now();

    await negotiation.save();
    res.json(negotiation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const negotiation = await Negotiation.findById(req.params.id);

    if (!negotiation) {
      return res.status(404).json({ message: 'Negotiation not found' });
    }

    res.json(negotiation.messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteNegotiation = async (req, res) => {
  try {
    const negotiation = await Negotiation.findByIdAndDelete(req.params.id);
    if (!negotiation) {
      return res.status(404).json({ error: 'Negotiation not found' });
    }
    res.status(200).json({ message: 'Negotiation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNegotiation,
  getAllNegotiations,
  getNegotiationById,
  updateNegotiation,
  addMessage,
  getMessages,
  deleteNegotiation,

};
