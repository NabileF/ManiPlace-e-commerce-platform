const mongoose = require('mongoose');

const PricingModelSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const PricingModel = mongoose.model('PricingModel', PricingModelSchema);
module.exports = PricingModel;