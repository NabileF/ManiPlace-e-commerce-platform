const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Endpoint de connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Recherche de l'utilisateur dans la base de données
    const user = await User.findOne({ email });

    // Vérification si l'utilisateur existe et si le mot de passe est correct
    if (!user || !(await user.matchPassword(password))) {
      throw new Error('Invalid email or password');
    }

    // Génération d'un token JWT
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.send({ token });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

module.exports = router;
