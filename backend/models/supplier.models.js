const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Declare the schema of the Mongo model
const supplierSchema = new mongoose.Schema({
   
  
  companyName: { 
    type: String, 
    required: true 
  },
  companyAddress: { 
    type: String, 
    required: true 
  },
  businessType: { 
    type: String,
     required: true },
  contactPerson: { type: String, required: true },
  emailAddress: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  identificationStatus: { type: String,     enum: ['Manufacturer', 'Wholesaler'],
  required: true },
  selectedPlanId: { type: mongoose.Schema.Types.ObjectId, ref:"subscriptionPlan", required: false },
  managedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  /*productManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductManager",
    required: false,
  },*/
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
  featuredListings: [String]
});

// Encrypting Password with Bcrypt
supplierSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Creating login functionality with password verification
supplierSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//export the model
module.exports = mongoose.model("Supplier", supplierSchema);