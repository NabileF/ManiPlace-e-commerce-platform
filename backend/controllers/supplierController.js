const Supplier = require('../models/supplier.models');

// Update Supplier Profile
const updateSupplierProfile = async (req, res) => {
  const {
    companyName,
    companyAddress,
    businessType,
    contactPerson,
    phoneNumber,
    identificationStatus,
    manufacturingCapabilities,
    products,
    wholesaleOperations,
    distributionChannels,
    availableInventory,
    subscription,
    selectedPlanId,
    trialSessions,
    managedProducts,
    productManager,
    pricingTiers,
    productVariations,
    managedOrders,
    negotiationHistory,
    analyticsDashboard,
    marketingCampaigns,
    sponsoredProductShowcases,
    featuredListings,
  } = req.body;

  try {
    const supplier = await Supplier.findById(req.supplier._id);

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    // Update supplier details
    supplier.companyName = companyName || supplier.companyName;
    supplier.companyAddress = companyAddress || supplier.companyAddress;
    supplier.businessType = businessType || supplier.businessType;
    supplier.contactPerson = contactPerson || supplier.contactPerson;
    supplier.phoneNumber = phoneNumber || supplier.phoneNumber;
    supplier.identificationStatus = identificationStatus || supplier.identificationStatus;
    supplier.manufacturingCapabilities = manufacturingCapabilities || supplier.manufacturingCapabilities;
    supplier.products = products || supplier.products;
    supplier.wholesaleOperations = wholesaleOperations || supplier.wholesaleOperations;
    supplier.distributionChannels = distributionChannels || supplier.distributionChannels;
    supplier.availableInventory = availableInventory || supplier.availableInventory;
    supplier.subscription = subscription || supplier.subscription;
    supplier.selectedPlanId = selectedPlanId || supplier.selectedPlanId;
    supplier.trialSessions = trialSessions || supplier.trialSessions;
    supplier.managedProducts = managedProducts || supplier.managedProducts;
    supplier.productManager = productManager || supplier.productManager;
    supplier.pricingTiers = pricingTiers || supplier.pricingTiers;
    supplier.productVariations = productVariations || supplier.productVariations;
    supplier.managedOrders = managedOrders || supplier.managedOrders;
    supplier.negotiationHistory = negotiationHistory || supplier.negotiationHistory;
    supplier.analyticsDashboard = analyticsDashboard || supplier.analyticsDashboard;
    supplier.marketingCampaigns = marketingCampaigns || supplier.marketingCampaigns;
    supplier.sponsoredProductShowcases = sponsoredProductShowcases || supplier.sponsoredProductShowcases;
    supplier.featuredListings = featuredListings || supplier.featuredListings;

    await supplier.save();

    res.json({
      message: 'Profile updated successfully',
      supplier
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update Product Inventory
const updateProductInventory = async (req, res) => {
  const { productId, stockQuantity } = req.body;

  // Validate that stockQuantity is a positive number
  if (stockQuantity < 0) {
    return res.status(400).json({ message: 'Invalid stock quantity. Please enter a positive number.' });
  }

  try {
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the product is part of a confirmed order
    const confirmedOrders = await BulkOrder.find({
      'products.product': productId,
      status: 'Confirmed'
    });

    if (confirmedOrders.length > 0) {
      return res.status(400).json({ message: 'Cannot update inventory for products in confirmed orders' });
    }

    // Update the stock quantity
    product.stockQuantity = stockQuantity;
    await product.save();

    res.json({ message: 'Inventory updated successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



module.exports = { updateSupplierProfile, updateProductInventory };