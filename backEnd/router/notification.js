const express = require('express');
const router = express.Router();
const orderModel = require('../models/order');
const notificationModel = require('../models/notification');

router.post('/accept', async (req, res) => {
  let idOrder = req.body.idOrder;
  let idTranslator = req.body.idTranslators;
  try {
    let order = await orderModel.findOne({where: {id: idOrder}}).then((order) => {
      order.update({status: 1, translatorId: idTranslator});
      return order;
    });

    let notification = await notificationModel.create({
      idCustomer: order.idCustomer,
      text: `accepted,${order.title},${order.id}`
    });

    res.json({message: 'Translator appointed!', notification})
  } catch (error) {
    res.json({message: 'Something was wrong!', error})
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
