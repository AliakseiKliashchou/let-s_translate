const express = require('express');
const router = express.Router();
const order = require('./orders');
const profile = require('./profile');
const message = require('./messages');
const notifications = require('./notification');
const collections = require('./collections');
const review = require('./review');
const price = require('./price');

router.use('/', order);
router.use('/profile', profile);
router.use('/', message);
router.use('/', notifications);
router.use('/collections', collections);
router.use('/review', review);
router.use('/price', price);

module.exports = router;
