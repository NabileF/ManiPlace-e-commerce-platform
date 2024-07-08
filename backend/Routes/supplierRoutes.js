const express = require('express');
const router = express.Router();
const { updateSupplierProfile, updateProductInventory } = require('../controllers/supplierController');
const { protect } = require('../middlewares/authMiddleware');

router.put('/profile', protect, updateSupplierProfile);
router.put('/inventory', protect, updateProductInventory); // Nouvelle route pour la mise à jour de l'inventaire


module.exports = router;