const express = require('express');
const router = express.Router();
const supplierProfileController = require('../controllers/supplierProfileController');
const authMiddleware = require('../middleware/authMiddleware');

// Route pour obtenir le profil du fournisseur
router.get('/profile', authMiddleware, supplierProfileController.getProfile);

// Route pour mettre à jour le profil du fournisseur
router.post('/profile', authMiddleware, supplierProfileController.updateProfile);

module.exports = router;
