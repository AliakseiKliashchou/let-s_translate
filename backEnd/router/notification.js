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
  try {
    let idCustomer;
    let idOrderFetch;
    let orderForSmth;
    if (isCollection) {
      let idOrdersInColl;
      let collection = await collectionModel.findOne({where: {id: idOrder}}).then((order) => {
        // order.update({status: 1, translatorId: idTranslator});
        idOrderFetch = order.idOrders;
        idCustomer = order.idCustomer;
      }).catch(err => res.json({msg: 'collection', err}));

      let smth = await orderModel
        .update({status: 1, translatorId: idTranslator}, {where: {id: idOrderFetch}})
        .catch(err => res.json({msg: 'orders', err}))
      orderForSmth = await orderModel.findAll({where: {id: idOrderFetch}})

    } else {

      orderForSmth = await orderModel.findOne({where: {id: idOrder}}).then((order) => {
        order.update({status: 1, translatorId: idTranslator});
        idCustomer = order.idCustomer;
      }).catch(err => res.json({msg: 'order', err}))

    }

    let customer = await customerModel.findOne({where: {id: idCustomer}}).then((customer) => {
      return {
        tariffName: customer.tariff,
        coins: customer.coins,
      };
    });
    let payment = [];

    let tariff = await tariffModel.findOne({where: {name: customer.tariffName}}).then((tariff) => {
      let {coeff} = tariff;

      if (typeof orderForSmth == 'object') {
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
    });
    let currentPayment = payment.reduce((sum, el) => sum + el, 0);
    let currentCount = orderForSmth.reduce((sum, el) => {
      return (el.urgency) ? (sum + el.price * 1.2) : (sum + el.price)
    }, 0);
    let data = {coins: customer.coins - currentPayment};
    let find = {where: {id: idCustomer}};

    await customerModel.update(data, find);

    await notificationModel.create({
      idCustomer: idCustomer,
      text: `accepted,${orderForSmth[0].title},${idOrder}`
    });

    if (typeof orderForSmth == 'object') {
      await orderForSmth.forEach(el => {
        aggregationModel.create({
          idOrder: el.id,
          coins: el.price,
          translatorId: idTranslator
        });
      })
    } else {
      aggregationModel.create({
        idOrder: idOrder,
        coins: currentCount,
        translatorId: idTranslator
      });
    }
  } catch (error) {
    res.status(401).json({message: 'Something was wrong!', error})
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
