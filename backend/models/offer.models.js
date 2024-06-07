const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  pricing_model_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PricingModel', required: true },
  base_price: { type: Number, required: true },
  product_details: {
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    product_name: { type: String, required: true }
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});


const Offer = mongoose.model('Offer', offerSchema);

module.exports =  Offer ;