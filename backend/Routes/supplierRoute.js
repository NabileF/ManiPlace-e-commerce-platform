// const express = require('express');
// const router = express.Router();
// const supplierProfileController = require('../controllers/supplierProfileController');
// const authMiddleware = require('../middleware/authMiddleware');

// // Route pour obtenir le profil du fournisseur
// router.get('/profile', authMiddleware, supplierProfileController.getProfile);

// // Route pour mettre à jour le profil du fournisseur
// router.post('/profile', authMiddleware, supplierProfileController.updateProfile);

// module.exports = router;const express = require('express');
const express = require('express');
const router = express.Router();
const supplierController = require('../Controllers/supplierController'); // Assure-toi d'importer le bon contrôleur

// Route pour obtenir le profil du fournisseur
router.get('/profile', supplierController.getProfile);

// Route pour mettre à jour le profil du fournisseur
router.put('/profile', supplierController.updateProfile);

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const supplierController = require('../controllers/supplierController');
// const authMiddleware = require('../middleware/authMiddleware');

// // Get supplier profile
// router.get('/profile', authMiddleware, supplierController.getProfile);

// // Update supplier profile
// router.put('/profile', authMiddleware, supplierController.updateProfile);

// module.exports = router;
