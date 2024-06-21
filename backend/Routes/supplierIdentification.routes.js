const express = require('express');
const router = express.Router();
const ProfileFormInput = require('./controllers/ProfileFormInput');

router.post('/register', ProfileFormInput);
module.exports = router;