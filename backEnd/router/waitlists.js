const express = require('express');
const router = express.Router();
const customerModel = require('../models/customer');
const translatorModel = require('../models/translator');
const waitlistModel = require('../models/waitlist');
const orderModel = require('../models/order');

router.post('/accept', async (req, res) => {
  let idOrder = req.body.idOrder;
  let id = req.body.idTranslators;
  let waitlistExist = await waitlistModel.findOne({where: {idOrder: idOrder}}).then((result) => {
    console.log(result)
    if (result) {
      let idTranslator = result.idTranslators;
      idTranslator.push(id);
      idTranslator  = [...new Set(idTranslator)];
      console.log("result.idTranslators", idTranslator);
      console.log("ID", id);
      result.update({idTranslators: idTranslator});
      res.json({message: 'OK DOBAVLEN'});
    } else {
      let idTranslatorArr = [];
      idTranslatorArr.push(req.body.idTranslators);
      let waitlist = waitlistModel.create({
        idCustomer: req.body.idCustomer,
        idOrder: req.body.idOrder,
        idTranslators: array
      });

      res.json({message: 'OK', waitlist});
    }
  })
});

router.get('/:idCustomer', async (req, res) => {
  let idCustomer = req.params.idCustomer;
  let idOrder;
  let idTranslators;

  let orders = await waitlistModel.findOne({where: {idCustomer: idCustomer}}).then((result) => {
    idOrder = result.idOrder;
    idTranslators = result.idTranslators;
  });

  let orderInfo = await orderModel.findOne({where: {id: idOrder}});
  let translator = await translatorModel.findAll({where: {id: idTranslators}});
  res.json({orders: orders, orderInfo: orderInfo, translator: translator});
});

module.exports = router;
