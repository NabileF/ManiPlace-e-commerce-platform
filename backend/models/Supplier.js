const mongoose = require("mongoose");
const { Schema } = mongoose;

const SupplierSchema = new Schema({
  supplierId: { type: String, required: true, unique: true },
  companyName: { type: String, required: true },
  companyAddress: { type: String, required: true },
  businessType: { type: String, required: true, enum: ['Manufacturer', 'Wholesaler', 'Retailer'] },
  contactPerson: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  phoneNumber: { type: String, required: true, match: /^\+?[1-9]\d{1,14}$/ },
  password: { type: String, required: true },
  identificationStatus: { type: String, required: true, enum: ['pending', 'verified', 'rejected'] },
  selectedPlanId: { type: Schema.Types.ObjectId, ref: "Plan", required: false },
  managedProducts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  productManager: { type: Schema.Types.ObjectId, ref: "ProductManager", required: false },
  pricingTiers: [{ type: Schema.Types.ObjectId, ref: "PricingTier", required: false }],
  productVariations: [{ type: Schema.Types.ObjectId, ref: "ProductVariation", required: false }],
  managedOrders: [{ type: Schema.Types.ObjectId, ref: "BulkOrder", required: false }],
  negotiationHistory: [{ type: Schema.Types.ObjectId, ref: "Negotiation", required: false }],
  analyticsDashboard: { type: Schema.Types.ObjectId, ref: "AnalyticsDashboard", required: false },
  marketingCampaigns: [String],
  sponsoredProductShowcases: [{ type: Schema.Types.ObjectId, ref: "SponsoredProductShowcase", required: false }],
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
