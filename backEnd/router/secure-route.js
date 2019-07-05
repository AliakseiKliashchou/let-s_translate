const express = require('express');
const router = express.Router();
const order = require('./orders');

router.use('/', order);

module.exports = router;