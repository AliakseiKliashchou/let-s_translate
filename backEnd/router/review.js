const express = require('express');
const router = express.Router();
const orderModel = require('../models/order');
const aggregationModel = require('../models/aggregation');
const translatorModel = require('../models/translator');
const notificationModel = require('../models/notification');

router.get('/orders', async(req, res) => {
  let orderStatus = await orderModel.findAll({where: {review: true, status: 2}}).then((result) => {
    return result;
  })

  res.json(orderStatus);
});

router.get('/customer/:id', async(req, res) => {
  let id = req.params.id;

  let order = await orderModel.findAll({where: {idCustomer: id, status: 4}}).then(order => order);

  res.json(order);
});

router.post('/done', async(req, res) => {
  let id = req.body.id;

  try {
    let order = await orderModel.findOne({where: {id: id}}).then(order => {
      if(order.status === 3) order.update({status: 4});
      return order;
    })
  
    let aggregation = await aggregationModel.findOne({where: {idOrder: order.id}}).then(aggregation => aggregation);
  
    let translator = await translatorModel.findOne({where: {id: aggregation.translatorId}}).then((translator) => {
      if(order.status === 4) {
        let coins = translator.coins;
        let payment = aggregation.coins;
  
        translator.update({coins: coins + payment});
  
        notificationModel.create({
          idCustomer: order.idCustomer,
          text: 'paid'
        });
  
        aggregationModel.destroy({where: {idOrder: order.id}});
      } else {
        res.json({message: 'Order in progress now!'})
      }
  
      return translator;
    });
  
    res.json({message: 'Transaction is successfully', order, aggregation})
  } catch(error) {
    res.json({message: 'Something was wrong!', error});
  }
});

module.exports = router;
