const mongoose = require("mongoose");


//Declare the schema of the Mongo model
const BuyerSchema = new mongoose.Schema({
   
  
  Username: { 
    type: String, 
    required: true,
   
},
  Email:{
 type: String, 
 required: true,
 unique: true,
 lowercase: true,
 match: [/\S+@\S+\.\S+/, 'is invalid'],
},
PhoneNumber: { 
    type: Number, 
    required: true,
    unique: true,
  
  },
  Password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 12,
  },
  UserType: {
    type: String,
    required: true,
    "description": "The type of user."
  },
  Address: {
    type: String,
    required: true,
  },
  ShippingAddress: {
    type: String,
    required: true,
   
  }
});
const Buyer = mongoose.model('Buyer', BuyerSchema);

module.exports = Buyer;