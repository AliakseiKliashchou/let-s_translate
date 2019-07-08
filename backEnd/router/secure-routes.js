const express = require('express');
const router = express.Router();
const order = require('./orders');
const profile = require('./profile');

router.use('/', order);
router.use('/profile', profile);

module.exports = router;