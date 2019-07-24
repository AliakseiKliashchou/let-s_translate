const express = require('express');
const router = express.Router();
const orderModel = require('../models/order');
const aggregationModel = require('../models/aggregation');
const translatorModel = require('../models/translator');
const notificationModel = require('../models/notification');

router.put('/', async (req, res) => {
  let id = req.body.id;
  let price = req.body.price;

  let order = await orderModel.findOne({where: {id: id}}).then((info) => {
    info.update({price: price});
    res.json({info});
  });

});

// router.post('/pay', async (req, res) => {
//   let id = req.body.id;

//   let order = await orderModel.findOne({where: {id: id}}).then((order) => {
//     return order;
//   });

//   let aggregation = await aggregationModel.findOne({where: {idOrder: order.id}}).then((aggregation) => {
//     return aggregation;
//   });

//   let translator = await translatorModel.findOne({where: {id: aggregation.translatorId}}).then((translator) => {
//     if(order.status === 4) {
//       let coins = translator.coins;
//       let payment = aggregation.coins;

//       translator.update({coins: coins + payment});

//       notificationModel.create({
//         idCustomer: order.idCustomer,
//         text: 'paid'
//       });

//       aggregationModel.destroy({where: {idOrder: order.id}});
//     } else {
//       res.json({message: 'Order in progress now!'})
//     }

//     return translator;
//   });

//   res.json({message: 'Transaction is successfully', order, aggregation, translator})
// });

module.exports = router;
