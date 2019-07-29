const express = require('express');
const router = express.Router();
const orderModel = require('../models/order');
const notificationModel = require('../models/notification');
const customerModel = require('../models/customer');
const collectionModel = require('../models/collection');
const tariffModel = require('../models/tariff');
const aggregationModel = require('../models/aggregation');

router.post('/accept', async (req, res) => {
  let {idOrder, idTranslator, isCollection} = req.body;
  let idCustomer;
  let idOrderFetch;
  let orderForSmth;

  if (isCollection) {
    let collection = await collectionModel.findOne({where: {id: idOrder}}).then((order) => {
      idOrderFetch = order.idOrders;
      idCustomer = order.idCustomer;

    }).catch(err => res.json({msg: 'collection error', err}));
  } else {
    orderForSmth = await orderModel.findOne({where: {id: idOrder}}).then((order) => {
      idCustomer = order.idCustomer;
      return order;
    }).catch(err => res.json({msg: 'order', err}))
  }

  let customer = await customerModel.findOne({where: {id: idCustomer}})
    .then((customer) => {
      return {
        tariffName: customer.tariff,
        coins: customer.coins,
      };
    })
    .catch(err => res.json({msg: 'customer doesn\'t exist', err}));

  let payment = [];

  let tariff = await tariffModel.findOne({where: {name: customer.tariffName}})
    .then((tariff) => {
      let {coeff} = tariff;

      if (Array.isArray(orderForSmth)) {
        orderForSmth.forEach(el => {
          let money = (el.urgency) ?
            Math.floor(el.price * coeff * 1.2) :
            Math.floor(el.price * coeff);
          payment.push(money);
        })
      } else {
        payment = (orderForSmth.urgency) ?
          Math.floor(orderForSmth.price * coeff * 1.2) :
          Math.floor(orderForSmth.price * coeff);
      }
      return tariff
    })
    .catch(err => res.json({msg: 'tariff doesn\'t exist', err}));

  if (isCollection) {

    orderForSmth = await orderModel.findAll({where: {id: idOrderFetch}})
      .then(orders => {
        let price = 0;
        orders.forEach(el => {
          price += el.price;
        });
        if (price > customer.coins) res.json({msg: 'customer doesn\'t have money'});
        else {
          collection.update({status: 1, translatorId: idTranslator})
            .catch(err => res.json({msg: 'collection doesn\'t updated', err}));
        }
      })
      .catch(err => res.json({msg: 'orders doesn\'t founded', err}));

    let smth = await orderModel
      .update({status: 1, translatorId: idTranslator}, {where: {id: idOrderFetch}})
      .catch(err => res.json({msg: 'orders', err}));
  } else {
    orderForSmth = await orderModel.findOne({where: {id: idOrder}}).then((order) => {
      if (order.price > customer.coins) res.json({msg: 'customer doesn\'t have money'});
      else {
        order.update({status: 1, translatorId: idTranslator});
        return order;
      }
    }).catch(err => res.json({msg: 'order', err}))
  }

  let currentPayment = payment;
  let currentCount = [];
  let title;
  if (Array.isArray(orderForSmth)) {
    title = orderForSmth[0].title;
    currentPayment = payment.reduce((sum, el) => sum + el, 0);
    currentCount = orderForSmth.reduce((sum, el) => {
      return (el.urgency) ? (sum + el.price * 1.2) : (sum + el.price)
    }, 0);
  } else {
    title = orderForSmth.title;
    currentCount = orderForSmth.price
  }

  let data = {coins: customer.coins - currentPayment};
  let find = {where: {id: idCustomer}};

  await customerModel.update(data, find);

  await notificationModel.create({
    idCustomer: idCustomer,
    text: `accepted,${title},${idOrder}`
  });

  if (Array.isArray(orderForSmth)) {
    await orderForSmth.forEach(el => {
      aggregationModel.create({
        idOrder: el.id,
        coins: el.price,
        translatorId: idTranslator
      });
    });
    res.json({msg: 'you get this work, nice'})
  } else {
    await aggregationModel.create({
      idOrder: idOrder,
      coins: currentCount,
      translatorId: idTranslator
    });
    res.json({msg: 'you get this work, nice'})
  }
});

router.get('/notifications', async (req, res) => {
  let idCustomer = req.query.idUser;
  notificationModel.findAll({where: {idCustomer: idCustomer}})
    .then((notifications) => {
      res.json(notifications)
    })
    .catch(err => res.json(err));
});

router.delete('/notifications', async (req, res) => {
  let {idNtf} = req.query;
  let notification = await notificationModel.destroy({where: {id: idNtf}})
  res.json('notification updated');
});


module.exports = router;
