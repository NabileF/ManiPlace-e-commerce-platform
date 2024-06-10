const { generateKey } = require('crypto');
const Supplier = require('../models/supplier.models');
const asyncHandler = require('express-async-handler');

// const createSupplier = asyncHandler(async (req, res) => {
//         // check if user is already existing
//       const emailAddress = req.body.emailAddress;
      
//       const findSupplier = await Supplier.findOne({emailAddress: emailAddress});
//       if (!findSupplier) {
//         // create new supplier
//         const newSupplier = await Supplier.create(req.body);
//         res.json(newSupplier);
//       }
//       else {
//         // user is already existing
//            throw new Error('User already exists')
        
//       }    
// });



const createSupplier = asyncHandler(async (req, res) => {
  const { emailAddress,  identificationStatus } = req.body;

  // Check if supplier already exists
  const findSupplier = await Supplier.findOne({ emailAddress });
  if (findSupplier) {
    throw new Error('User already exists');
  }

  // Define the supplier data based on business type
  let supplierData = {
    ...req.body,
  };

  if (identificationStatus === 'wholesaler') {
    const { wholesalerLicenseNumber, region } = req.body;
    supplierData.wholesalerDetails = { wholesalerLicenseNumber, region };
  } else if (identificationStatus === 'manufacturer') {
    const { factoryLocation, certification } = req.body;
    supplierData.manufacturerDetails = { factoryLocation, certification };
  }

  // Create new supplier
  const newSupplier = await Supplier.create(supplierData);
  res.json(newSupplier);
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

module.exports = {createSupplier, loginSupplierCtrl, getAllSuppliers, getaSupplier};