// controllers/userController.js
const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const { name, role } = req.body;
    if (!['buyer', 'wholesaler', 'manufacturer'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    const newUser = await User.create({ name, role });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add other controller actions for users (e.g., updateUser, deleteUser, etc.)
