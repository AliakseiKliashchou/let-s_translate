const express = require('express');
const router = express.Router();
const translatorModel = require('../models/translator');
const orderModel = require('../models/order');
const notificationModel = require('../models/notification');


router.post('/accept', async (req, res) => {
  let idOrder = req.body.idOrder;
  let idTranslator = req.body.idTranslators;

  try {
    let order = await orderModel.findOne({where: {id: idOrder}}).then((order) => {
      order.update({status: 1, translatorId: idTranslator});

      let message = notificationModel.create({
        idCustomer: order.idCustomer,
        text: 'OK ORDER',
        read: false
      })
    });

    res.json({message: 'Translator appointed!'})
  } catch (error) {
    res.json({message: 'Something was wrong!', error})
  }
});

router.get('/:idCustomer', async (req, res) => {
  let idCustomer = req.params.idCustomer;

  let notification = await notificationModel.findAll({where: {idCustomer: idCustomer}}).then((info) => {
    return info;
  });
  res.json(notification)
});


// router.post('/selectTranslator', async (req, res) => {
//   const {idWaitlist, idTrans, idOrder} = req.body;
//   waitlistModel.destroy({where: {id: idWaitlist}});
//   orderModel.findOne({where: {id: idOrder}}).then((result) => {
//     result.update({status: 1, idTranslator: idTrans})
//   });
// });
//
// router.get('/:idCustomer', async (req, res) => {
//   let idCustomer = req.params.idCustomer;
//   let idOrders;
//   let idTranslators;
//
//   let orders = await waitlistModel.findAll({where: {idCustomer: idCustomer}}).then((result) => {
//     let newResult = result;
//     idOrders = result.map(el => el.idOrder);
//     idTranslators = result.map(el => el.idTranslators);
//
//     const prom = new Promise(res => res('ok')).then(res => {
//       orderModel.findAll({where: {id: idOrders}}).then(orders => {
//         orders.forEach((el, index) => {
//           newResult[index].idOrder = el;
//         });
//       });
//       return newResult;
//     }).then(resultAfterOrder => {
//       for (let i = 0; i < idTranslators.length; i++) {
//         let currentId = idTranslators[i];
//         translatorModel.findAll({where: {id: currentId}}).then(translators => {
//           resultAfterOrder[i].idTranslators = translators;
//           if (i === idTranslators.length - 1) {
//             res.json(resultAfterOrder)
//           }
//         });
//       }
//     });
//   });
// });

module.exports = router;
