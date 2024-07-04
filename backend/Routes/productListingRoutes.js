const express = require("express");
const router = express.Router();
const productListingController = require("../controllers/productListing");
const { protect } = require('../middlewares/authMiddleware');


router.post("/add-productListing",protect ,productListingController.AddNewListing);

module.exports = router;
