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
    if (result) {
      let idTranslator = result.idTranslators;
      idTranslator.push(id);
      idTranslator = [...new Set(idTranslator)];
      result.update({idTranslators: idTranslator});
      res.json({message: 'OK DOBAVLEN'});
    } else {
      let idTranslatorArr = [];
      idTranslatorArr.push(id);
      let waitlist = waitlistModel.create({
        idCustomer: req.body.idCustomer,
        idOrder: req.body.idOrder,
        idTranslators: idTranslatorArr
      });

      res.json({message: 'OK', waitlist});
    }
  })
});

router.post('/selectTranslator', async (req, res) => {
  const {idWaitlist, idTrans, idOrder} = req.body;
  waitlistModel.destroy({where: {id: idWaitlist}});
  orderModel.findOne({where: {id: idOrder}}).then((result) => {
    result.update({status: 1, idTranslator: idTrans})
  });
});

router.get('/:idCustomer', async (req, res) => {
  let idCustomer = req.params.idCustomer;
  let idOrders;
  let idTranslators;

  let orders = await waitlistModel.findAll({where: {idCustomer: idCustomer}}).then((result) => {
    let newResult = result;
    idOrders = result.map(el => el.idOrder);
    idTranslators = result.map(el => el.idTranslators);

    const prom = new Promise(res => res('ok')).then(res => {
      orderModel.findAll({where: {id: idOrders}}).then(orders => {
        orders.forEach((el, index) => {
          newResult[index].idOrder = el;
        });
      });
      return newResult; 
    }).then(resultAfterOrder => {
      for (let i = 0; i < idTranslators.length; i++) {
        let currentId = idTranslators[i];
        translatorModel.findAll({where: {id: currentId}}).then(translators => {
          resultAfterOrder[i].idTranslators = translators;
          if (i === idTranslators.length - 1) { 
            res.json(resultAfterOrder)
          }
        });
      }
    });
  });
});

module.exports = router;
