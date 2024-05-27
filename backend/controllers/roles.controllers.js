// const Supplier = require('../models/supplier');
// const Wholesaler = require('../models/wholesaler');
// const Buyer = require('../models/buyer');

// exports.supplierRegister = (req, res) => {
//   res.render('role/supplierRegister');
// };

// exports.wholesalerRegister = (req, res) => {
//   res.render('role/wholesalerRegister');
// };

// exports.buyerRegister = (req, res) => {
//   res.render('role/buyerRegister');
// };

// exports.supplierPostRegister = async (req, res) => {
//   const { supplierId, companyName, companyAddress, businessType, contactPerson, emailAddress, phoneNumber, password } = req.body;
//   try {
//     const supplier = new Supplier({ supplierId, companyName, companyAddress, businessType, contactPerson, emailAddress, phoneNumber, password });
//     await supplier.save();
//     res.redirect('/login');
//   } catch (error) {
//     res.status(500).send('Error registering supplier.');
//   }
// };

// exports.wholesalerPostRegister = async (req, res) => {
//   const { wholesalerId, companyName, ...otherFields } = req.body;
//   try {
//     const wholesaler = new Wholesaler({ wholesalerId, companyName, ...otherFields });
//     await wholesaler.save();
//     res.redirect('/login');
//   } catch (error) {
//     res.status(500).send('Error registering wholesaler.');
//   }
// };

// exports.buyerPostRegister = async (req, res) => {
//   const { buyerId, name, ...otherFields } = req.body;
//   try {
//     const buyer = new Buyer({ buyerId, name, ...otherFields });
//     await buyer.save();
//     res.redirect('/login');
//   } catch (error) {
//     res.status(500).send('Error registering buyer.');
//   }
// };
