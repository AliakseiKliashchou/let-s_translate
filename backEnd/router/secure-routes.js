const express = require('express');
const router = express.Router();
const order = require('./orders');
const profile = require('./profile');
const message = require('./messages');
const waitlist = require('./waitlists');
const collections = require('./collections');

router.use('/', order);
router.use('/profile', profile);
router.use('/', message);
router.use('/waitlist', waitlist);
router.use('/collections', collections);

module.exports = router;