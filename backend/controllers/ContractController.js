const Contract = require('../models/contract.model');

// Create a new contract
const createContract = async (req, res) => {
  try {
    const { offerId, negotiationId, agreedTerms, contractDocumentUrl, digitalSignatures } = req.body;
    const contract = new Contract({
      offerId,
      negotiationId,
      agreedTerms,
      contractDocumentUrl,
      digitalSignatures
    });
    await contract.save();
    res.status(201).json(contract);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all contracts
const getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.find();
    res.json(contracts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single contract by ID
const getContractById = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (contract) {
      res.json(contract);
    } else {
      res.status(404).json({ message: 'Contract not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a contract by ID
const updateContract = async (req, res) => {
  try {
    const { offerId, negotiationId, agreedTerms, contractDocumentUrl, digitalSignatures } = req.body;
    const contract = await Contract.findByIdAndUpdate(req.params.id, {
      offerId,
      negotiationId,
      agreedTerms,
      contractDocumentUrl,
      digitalSignatures
    }, { new: true });
    if (contract) {
      res.json(contract);
    } else {
      res.status(404).json({ message: 'Contract not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a contract by ID
const deleteContract = async (req, res) => {
  try {
    const contract = await Contract.findByIdAndDelete(req.params.id);
    if (contract) {
      res.json({ message: 'Contract deleted' });
    } else {
      res.status(404).json({ message: 'Contract not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    createContract,
    getAllContracts,
    getContractById,
    updateContract,
    deleteContract
  };
  