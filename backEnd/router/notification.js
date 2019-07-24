const express = require('express');
const router = express.Router();
const orderModel = require('../models/order');
const notificationModel = require('../models/notification');
const customerModel = require('../models/customer');
const tariffModel = require('../models/tariff');
const aggregationModel = require('../models/aggregation');

router.post('/accept', async (req, res) => {
  let idOrder = req.body.idOrder;
  let idTranslator = req.body.idTranslators;
  try {
    let order = await orderModel.findOne({where: {id: idOrder}}).then((order) => {
      order.update({status: 1, translatorId: idTranslator});
      return order;
    });

    let createAggregation = await aggregationModel.create({
      idOrder: order.id,
      coins: 0,
      translatorId: order.translatorId
    });

    let customer = await customerModel.findOne({where: {id: order.idCustomer}}).then((customer) => {
      return {
        tariffName: customer.tariff,
        coins: customer.coins,
      };
    });

    let tariff = await tariffModel.findOne({where: {name: customer.tariffName}}).then((tariff) => {
      let { coeff } = tariff;
      if(order.urgency) {
        payment = Math.floor(order.price * coeff * 1.2);
      } else {
        payment = Math.floor(order.price * coeff);
      }
      return tariff
    });

    let data = {coins: customer.coins - (order.price - payment)};
    let find = {where: {id: order.idCustomer}};
    let updateCustomer = await customerModel.update(data, find);
  
    let aggregation = await aggregationModel.findOne({where: {idOrder: order.id}}).then((aggregation) => {
      let coins = aggregation.coins;
      let price = order.price;
      console.log(aggregation)
      aggregation.update({coins: coins + price});
    });

    let notification = await notificationModel.create({
      idCustomer: order.idCustomer,
      text: `Accepted. Your order: ${order.title}, your order id: ${order.id}`
    });

    res.json({message: 'Translator appointed!'});
  } catch (error) {
    res.satus(401).json({message: 'Something was wrong!', error})
  }
});

router.get('/notifications', async (req, res) => {
  let idCustomer = req.query.idUser;
  
  let notification = await notificationModel.findAll({where: {idCustomer: idCustomer}}).then((info) => {
    return info;
  });

  res.json(notification)
});

router.delete('/notifications', async (req, res) => {
  let {idNtf} = req.query;
  let notification = await notificationModel.destroy({where: {id: idNtf}})
  res.json('notification updated');
});


module.exports = router;
