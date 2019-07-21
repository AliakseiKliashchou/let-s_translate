const express = require('express');
const router = express.Router();
const order = require('./orders');
const profile = require('./profile');
const message = require('./messages');
const notifications = require('./notification');
const collections = require('./collections');
const review = require('./review');
const price = require('./price');
const tariff = require('./tariffs');

router.use('/', order);
router.use('/profile', profile);
router.use('/', message);
router.use('/notification', notifications);
router.use('/collections', collections);
router.use('/review', review);
router.use('/price', price);
router.use('/tariff', tariff);

module.exports = router;
