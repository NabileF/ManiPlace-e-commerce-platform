const express = require('express');
const router = express.Router();
const supplierIdentification = require('../controllers/supplierIdentificationForm.ctrl');
const ProfileFormInput = require('../controllers/supplierIdentificationForm.ctrl');

router.post('/register', ProfileFormInput);
module.exports = router;