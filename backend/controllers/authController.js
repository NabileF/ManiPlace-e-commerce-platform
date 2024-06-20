const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Supplier = require('../models/supplier.models');
const { jwtSecret } = require('../config');

// Register a new supplier
const registerSupplier = async (req, res) => {
  const {
    companyName,
    companyAddress,
    businessType,
    contactPerson,
    emailAddress,
    phoneNumber,
    password,
    identificationStatus,

  } = req.body;

  try {
    let existingSupplier = await Supplier.findOne({ emailAddress });

    if (existingSupplier) {
      return res.status(400).json({ message: 'Supplier already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSupplier = await Supplier.create({
      companyName,
      companyAddress,
      businessType,
      contactPerson,
      emailAddress,
      phoneNumber,
      password: hashedPassword,
      identificationStatus,

    });

    const token = jwt.sign({ id: newSupplier._id }, jwtSecret, {
      expiresIn: '30d',
    });

    res.status(201).json({
      _id: newSupplier._id,
      companyName: newSupplier.companyName,
      emailAddress: newSupplier.emailAddress,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Login a supplier
const loginSupplier = async (req, res) => {

  try {
    const supplier = await Supplier.findOne({ emailAddress: req.body.email });

    if (!supplier) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, supplier.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: supplier._id }, jwtSecret, {
      expiresIn: '30d',
    });

    res.json({
      _id: supplier._id,
      companyName: supplier.companyName,
      emailAddress: supplier.emailAddress,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { registerSupplier, loginSupplier };
