const express = require('express');
const router = express.Router();
const customerModel = require('../models/customer');

router.get('/confirm', async(req, res) => {
  console.log(req.query);
  res.json('OK');
  console.log('CONFIRMED')
});

module.exports = router;
