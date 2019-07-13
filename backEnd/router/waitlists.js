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

router.get('/:idCustomer', async (req, res) => {
  let idCustomer = req.params.idCustomer;
  let idOrders;
  let idTranslators;



  let order = await waitlistModel.findAll({where: {idCustomer: idCustomer}}, {plain: false}).then((result) => {
    idOrders = result.map(el => el.idOrder);
    idTranslators = result.map(el => el.idTranslators);
  })
  res.json({promise})

  // let orderInfo = await orderModel.findAll({where: {id: idOrders}}).then(orders => {
  //   return orders;
  // })

  // for (let i = 0; i < idTranslators.length; i++) {
  //   let currentId = idTranslators[i];

  //   let translators = await translatorModel.findAll({where: {id: currentId}}).then(translators => {
  //     return translators;
  //   })

  // }
  // res.json(translators);

  // Ищем всех кастомеров, возвращаем массив
  // let orders = await waitlistModel.findAll({where: {idCustomer: idCustomer}}).then((result) => {
  //   let newResult = result;
  //   idOrders = result.map(el => el.idOrder); // Ищем все id ордеров, возвращаем массив
  //   idTranslators = result.map(el => el.idTranslators); // Ищем все id транслейтеров, возвращаем массив

  //   const prom = new Promise(res => res('ok')).then(res => { // формируем все в один объект
  //     orderModel.findAll({where: {id: idOrders}}).then(orders => { //Ищем все заказы по id и возвращаем массив
  //       orders.forEach((el, index) => {
  //         newResult[index].idOrder = el; //перебираем заказы
  //       });
  //     });
  //     return newResult; 
  //   }).then(resultAfterOrder => {
  //     for (let i = 0; i < idTranslators.length; i++) { // Массив с массивами переводчиков типа [[2], [2, 1], [4]]
  //       let currentId = idTranslators[i];
  //       translatorModel.findAll({where: {id: currentId}}).then(translators => { // смотри в массиве с массивами по индексу транслейтеров
  //         resultAfterOrder[i].idTranslators = translators;
  //         if (i === idTranslators.length - 1) { // доходим до последнего и если его нет, то отправляем объект
  //           res.json(resultAfterOrder)
  //         }
  //       });
  //     }
  //   });
  // });
});

module.exports = router;
