const express = require('express');
const router = express.Router();
const customerModel = require('../models/customer');
const translatorModel = require('../models/translator');
const orderModel = require('../models/order');

router.post('/order', async(req, res) => {
  let email = req.body.email;
  let customer = await customerModel.findOne({where: {email: email}}).then((customer) => {
    res.json({customer})
  })
})

module.exports = router;