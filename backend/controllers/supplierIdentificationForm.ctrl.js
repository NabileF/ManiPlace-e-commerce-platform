const asyncHandler = require('express-async-handler');
const Supplier = require('../models/Supplier'); // Adjust the path as per your file structure

const ProfileFormInput = asyncHandler(async (req, res) => {
    const { emailAddress, identificationStatus } = req.body;

    // Check if supplier already exists
    const findSupplier = await Supplier.findOne({ emailAddress });
    if (findSupplier) {
        throw new Error('User already exists');
    }

    // Define the initial supplier data
    let supplierData = {
        ...req.body,
    };

    // Create new supplier
    const newSupplier = await Supplier.create(supplierData);

    // Update supplier based on identification type
    if (identificationStatus === 'wholesaler') {
        const { wholesalerLicenseNumber, region } = req.body;
        newSupplier.wholesalerDetails = { wholesalerLicenseNumber, region };
    } else if (identificationStatus === 'manufacturer') {
        const { factoryLocation, certification } = req.body;
        newSupplier.manufacturerDetails = { factoryLocation, certification };
    }

    // Save the updated supplier
    await newSupplier.save();

    res.json(newSupplier);
});

module.exports = ProfileFormInput;
