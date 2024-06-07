const Negotiation = require('../models/Negotiation.models');

const createNegotiation = async (req, res) => {
    try {
        const { buyer_id, supplier_id, order_id, messages } = req.body;
        const newNegotiation = new Negotiation({ buyer_id, supplier_id,order_id, messages});
    await newNegotiation.save();
    res.status(201).json(newNegotiation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllNegotiations = async (req, res) => {
  try {
    const negotiations = await Negotiation.find({});
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
     const { buyer_id, supplier_id, order_id, messages} = req.body;
    const negotiation = await Negotiation.findByIdAndUpdate(id , {buyer_id, supplier_id, order_id, messages }, { new: true });
    if (!negotiation) 
    return res.status(404).json({ error: 'Negotiation not found' });
    res.status(200).json(negotiation);
  } catch (error) {
    res.status(500).json({ error: error.message });
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


const addMessageToNegotiation = async (req, res) => {
  try {
    const negotiation = await Negotiation.findById(req.params.id);
    if (!negotiation) return res.status(404).json({ error: 'Negotiation not found' });
    await negotiation.addMessage(req.body.message);
    res.status(200).json(negotiation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateNegotiationStatus = async (req, res) => {
  try {
    const negotiation = await Negotiation.findById(req.params.id);
    if (!negotiation) return res.status(404).json({ error: 'Negotiation not found' });
    await negotiation.updateStatus(req.body.status);
    res.status(200).json(negotiation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNegotiation,
  getAllNegotiations,
  getNegotiationById,
  updateNegotiation,
  deleteNegotiation,
  addMessageToNegotiation,
  updateNegotiationStatus
};
