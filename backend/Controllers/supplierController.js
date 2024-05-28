const SupplierProfile = require('../models/supplierProfileModel');

// Fonction pour obtenir le profil du fournisseur
exports.getProfile = async (req, res) => {
  try {
    const profile = await SupplierProfile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Fonction pour mettre à jour le profil du fournisseur
exports.updateProfile = async (req, res) => {
  try {
    const { identification, manufacturingCapabilities, products, wholesaleOperations, distributionChannels, availableInventory } = req.body;

    let profile = await SupplierProfile.findOne({ userId: req.user._id });

    if (!profile) {
      profile = new SupplierProfile({
        userId: req.user._id,
        identification,
        manufacturingCapabilities,
        products,
        wholesaleOperations,
        distributionChannels,
        availableInventory
      });
    } else {
      profile.identification = identification;
      profile.manufacturingCapabilities = manufacturingCapabilities;
      profile.products = products;
      profile.wholesaleOperations = wholesaleOperations;
      profile.distributionChannels = distributionChannels;
      profile.availableInventory = availableInventory;
    }

    await profile.save();

    res.json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
