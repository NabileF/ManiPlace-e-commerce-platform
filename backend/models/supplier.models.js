// const mongoose = require("mongoose");
// const bcrypt = require('bcryptjs');
// const SupplierSchema = new mongoose.Schema({
//   // supplierId: { type: String, required: true },
//   companyName: { type: String, required: true },
//   companyAddress: { type: String, required: true },
//   businessType: { type: String, required: true },
//   contactPerson: { type: String, required: true },
//   emailAddress: { type: String, required: true },
//   phoneNumber: { type: String, required: true },
//   password: { type: String, required: true },
//   subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'SubscriptionPlan', required: false },
//   identificationStatus: { type: String, required: true },
//   selectedPlanId: { type: String, required: false },
//   trialSessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TrialSession' }],
//   managedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
//   productManager: { type: mongoose.Schema.Types.ObjectId, ref: "ProductManager", required: false,},
//   pricingTiers: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "PricingTier",
//       required: false,
//     },
//   ],
//   productVariations: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "ProductVariation",
//       required: false,
//     },
//   ],
//   managedOrders: [
//     { type: mongoose.Schema.Types.ObjectId, ref: "BulkOrder", required: false },
//   ],
//   negotiationHistory: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Negotiation",
//       required: false,
//     },
//   ],
//   analyticsDashboard: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "AnalyticsDashboard",
//     required: false,
//   },
//   marketingCampaigns: [String],
//   sponsoredProductShowcases: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "SponsoredProductShowcase",
//       required: false,
//     },
//   ],
//   featuredListings: [String],
//   // trialPlans: [
//   //   {
//   //     planId: { type: String, required: true },
//   //     startDate: { type: Date, required: true },
//   //     isActive: { type: Boolean, required: true },
//   //     endDate: { type: Date, required: true },
//   //   },
//   //],
// });
// // Add a method to compare passwords
// SupplierSchema.methods.isPasswordMatched = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };


// module.exports = mongoose.model("Supplier", SupplierSchema);

// // const mongoose = require("mongoose");

// // const SupplierSchema = new mongoose.Schema({
// //   companyName: { type: String, required: true },
// //   companyAddress: { type: String, required: true },
// //   businessType: { type: String, required: true },
// //   contactPerson: { type: String, required: true },
// //   emailAddress: { type: String, required: true },
// //   phoneNumber: { type: String, required: true },
// //   password: { type: String, required: true },
// //   subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'SubscriptionPlan', required: false },
// //   identificationStatus: { type: String, required: true },
// //   selectedPlanId: { type: String, required: false },
// //   trialSessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TrialSession' }],
// //   managedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
// //   productManager: { type: mongoose.Schema.Types.ObjectId, ref: "ProductManager", required: false,},
// //   pricingTiers: [
// //     {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "PricingTier",
// //       required: false,
// //     },
// //   ],
// //   productVariations: [
// //     {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "ProductVariation",
// //       required: false,
// //     },
// //   ],
// //   managedOrders: [
// //     { type: mongoose.Schema.Types.ObjectId, ref: "BulkOrder", required: false },
// //   ],
// //   negotiationHistory: [
// //     {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Negotiation",
// //       required: false,
// //     },
// //   ],
// //   analyticsDashboard: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: "AnalyticsDashboard",
// //     required: false,
// //   },
// //   marketingCampaigns: [String],
// //   sponsoredProductShowcases: [
// //     {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "SponsoredProductShowcase",
// //       required: false,
// //     },
// //   ],
// //   featuredListings: [String],
// //   identificationType: { type: String, enum: ['Manufacturer', 'Wholesaler'], required: false },
// //   manufacturingCapabilities: { type: String, required: false },
// //   products: { type: String, required: false },
// //   wholesaleOperations: { type: String, required: false },
// //   distributionChannels: { type: String, required: false },
// //   availableInventory: { type: String, required: false },
// // });

// // module.exports = mongoose.model("Supplier", SupplierSchema);






















const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const SupplierSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyAddress: { type: String, required: true },
  businessType: { type: String, required: true },
  contactPerson: { type: String, required: true },
  emailAddress: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'SubscriptionPlan', required: false },
  identificationStatus: { type: String, required: true },
  selectedPlanId: { type: String, required: false },
  trialSessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TrialSession' }],
  managedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  productManager: { type: mongoose.Schema.Types.ObjectId, ref: "ProductManager", required: false },
  pricingTiers: [{ type: mongoose.Schema.Types.ObjectId, ref: "PricingTier", required: false }],
  productVariations: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductVariation", required: false }],
  managedOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "BulkOrder", required: false }],
  negotiationHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Negotiation", required: false }],
  analyticsDashboard: { type: mongoose.Schema.Types.ObjectId, ref: "AnalyticsDashboard", required: false },
  marketingCampaigns: [String],
  sponsoredProductShowcases: [{ type: mongoose.Schema.Types.ObjectId, ref: "SponsoredProductShowcase", required: false }],
  featuredListings: [String],
});

SupplierSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Supplier", SupplierSchema);

