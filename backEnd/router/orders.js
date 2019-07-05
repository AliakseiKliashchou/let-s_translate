const express = require('express');
const router = express.Router();
// const customerModel = require('../models/customer');
// const translatorModel = require('../models/translator');
const orderModel = require('../models/order');

router.post('/order', async(req, res) => {
  let order = await orderModel.create({
    idCustomer: req.body.id,
    name: req.body.name,
    email: req.body.email,
    download: req.body.url,
    originalLanguage: req.body.initialLng,
    translateLanguage: req.body.finiteLng,
    tags: req.body.tags,
    title: req.body.title,
    urgency: req.body.urgency,
    review: req.body.additional_review,
    progress: 0,
    date: new Date()
  })

  res.json({order})
})

module.exports = router;