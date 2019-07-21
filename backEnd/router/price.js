const express = require('express');
const router = express.Router();
const orderModel = require('../models/order');

router.put('/', async(req, res) => {
  let id = req.body.id;
  let price = req.body.price;

  let order = await orderModel.findOne({where: {id: id}}).then((info) => {
    info.update({price: price});
    res.json({info});
  });

});

module.exports = router;