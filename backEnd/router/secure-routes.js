const express = require('express');
const router = express.Router();
const order = require('./orders');
const profile = require('./profile');
const message = require('./messages');
const notifications = require('./notification');
const collections = require('./collections');

router.use('/', order);
router.use('/profile', profile);
router.use('/', message);
router.use('/notification', notifications);
router.use('/collections', collections);

module.exports = router;
