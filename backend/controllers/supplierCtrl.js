const { generateKey } = require('crypto');
const Supplier = require('../models/supplier.models');
const asyncHandler = require('express-async-handler');

const createSupplier = asyncHandler(async (req, res) => {
        // check if user is already existing
      const emailAddress = req.body.emailAddress;
      
      const findSupplier = await Supplier.findOne({emailAddress: emailAddress});
      if (!findSupplier) {
        // create new supplier
        const newSupplier = await Supplier.create(req.body);
        res.json(newSupplier);
      }
      else {
        // user is already existing
           throw new Error('User already exists')
        
      }    
});
const identifySupplier = asyncHandler(async (req, res) => {
  const { supplierId, identificationStatus } = req.body;

  try {
      const supplier = await Supplier.findOneAndUpdate(
          { supplierId },
          { identificationStatus },
          { new: true }
      );

      if (!supplier) {
          return res.status(404).json({ message: 'Supplier not found' });
      }

      res.json({ message: 'Identification successful', supplier });
  } catch (error) {
      res.status(500).json({ message: 'Identification failed', error: error.message });
  }
});

const loginSupplierCtrl = asyncHandler(async (req, res) => {
    const { emailAddress, password } = req.body; 
    // check if user is already existing
    const findSupplier = await Supplier.findOne({emailAddress});
    if (findSupplier && ( await findSupplier.isPasswordMatched(password))) {
      res.json({
        _id: findSupplier?._id,
        companyName: findSupplier?.companyName,
        companyAddress: findSupplier?.companyAddress,
        businessType: findSupplier?.businessType,
        contactPerson: findSupplier?.contactPerson,
        emailAddress: findSupplier.emailAddress,
        phoneNumber: findSupplier.phoneNumber,
        token: generateToken(findSupplier?._id),
      });
    }
    else {
        throw new Error('invalid credentials');
      }
      
    
});
// get all supplioers
const getAllSuppliers = asyncHandler( async(req, res) => {
  try {
    const getSuppliers = await Supplier.find();
    res.json(getSuppliers);
  }
  catch (err) {
    throw new Error(error);
  }
});

// get a single supplier

const getaSupplier = asyncHandler( async(req, res) => {
  const { id } = req.params;
  try{
    const getaSupplier = await Supplier.findById( id );
    res.json({
      getaSupplier,
    });
  }catch (err) {
    throw new Error(error);
  }
});

module.exports = {createSupplier, loginSupplierCtrl, getAllSuppliers, getaSupplier, identifySupplier};