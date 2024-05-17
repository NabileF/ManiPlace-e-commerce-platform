const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
  supplierId: { type: String, required: true },
  companyName: { type: String, required: true },
  companyAddress: { type: String, required: true },
  businessType: { type: String, required: true },
  contactPerson: { type: String, required: true },
  emailAddress: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  identificationStatus: { type: String, required: true },
  selectedPlanId: { type: String, required: false },
  managedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  productManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductManager",
    required: false,
  },
  pricingTiers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PricingTier",
      required: false,
    },
  ],
  productVariations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariation",
      required: false,
    },
  ],
  managedOrders: [
    { type: mongoose.Schema.Types.ObjectId, ref: "BulkOrder", required: false },
  ],
  negotiationHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Negotiation",
      required: false,
    },
  ],
  analyticsDashboard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AnalyticsDashboard",
    required: false,
  },
  marketingCampaigns: [String],
  sponsoredProductShowcases: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SponsoredProductShowcase",
      required: false,
    },
  ],
  featuredListings: [String],
  trialPlans: [
    {
      planId: { type: String, required: true },
      startDate: { type: Date, required: true },
      isActive: { type: Boolean, required: true },
      endDate: { type: Date, required: true },
    },
  ],
});

module.exports = mongoose.model("Supplier", SupplierSchema);