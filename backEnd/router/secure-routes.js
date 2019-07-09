const express = require('express');
const router = express.Router();
const order = require('./orders');
const profile = require('./profile');
const message = require('./messages');

router.use('/', order);
router.use('/profile', profile);
router.use('/', message);

module.exports = router;