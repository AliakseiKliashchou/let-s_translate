const express = require('express');
const router = express.Router();
const orderModel = require('../models/order');
const translatorModel = require('../models/translator');
const collectionModel = require('../models/collection');
const aggregationModel = require('../models/aggregation');
const customerModel = require('../models/customer');
const notificationModel = require('../models/notification');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post('/order', async (req, res) => {
  let urls = req.body.url;
  let ordersInfo = {
    idCustomer: req.body.idCustomer,
    name: req.body.name,
    email: req.body.email,
    download: '',
    originalLanguage: req.body.initialLng,
    translateLanguage: req.body.finiteLng,
    tags: req.body.tags,
    title: req.body.title,
    urgency: req.body.urgency,
    review: req.body.additionalReview,
    status: 0,
    progress: 0,
    date: new Date(),
    isCollections: false,
    oneTranslator: false,
    price: 0,
  };
  try {
    if (urls.length > 1) {
      let ordersArray = [];
      for (let i = 0; i < urls.length; i++) {
        ordersInfo.download = urls[i];
        ordersInfo.isCollections = true;
        let order = await orderModel.create(ordersInfo);
        ordersArray.push(order.id);
      }
      let collection = collectionModel.create({
        idOrders: ordersArray,
        title: req.body.title,
        idCustomer: req.body.idCustomer,
        oneTranslator: false
      });
    } else {
      ordersInfo.download = urls[0];
      let order = await orderModel.create(ordersInfo);
    }
    res.json({message: 'Orders is created!'})
  } catch (error) {
    res.status(400).json({message: 'Order is not created!', error})
  }
});

//customer STATUS
router.get('/orders', async (req, res) => {
  const id = req.query.idCustomer;

  try {
    let orders = await orderModel.findAll({where: {idCustomer: id}});
    res.json(orders);
  } catch (error) {
    res.status(400).json({error, message: 'Can not find any order'});
  }
});

//translator STATUS
router.get('/orders/unowned', async (req, res) => {
  const idTranslator = req.query.idTranslator;
  try {
    let translator = await translatorModel.findOne({where: {id: idTranslator}});
    const languages = translator.languages;
    const status = [0, 2];
    let orders = await orderModel.findAll(
      {
        where: {
          status: {[Op.in]: status},
          originalLanguage: {[Op.in]: languages},
          translateLanguage: {[Op.in]: languages},
        }
      }).then(ordersArray => {
      if (ordersArray) {
        const newArray = ordersArray.filter(el => {
          if (el.isCollections && el.oneTranslator) {
          } else return el;
        });
        res.json(newArray);
      } else res.json({msg: 'You don\'t have work'})
    });
  } catch (error) {
    console.log(error)
    res.json({message: error});
  }
});

//translator
router.get('/order/filter', async (req, res) => {
  const tags = req.query.tags;
  let tagsArray = [];
  if (tags.length) tagsArray = tags.split(',');
  const idTranslator = req.query.idTranslator;
  let translator = await translatorModel.findOne({where: {id: idTranslator}});
  const languages = translator.languages;
  try {
    let orders = await orderModel.findAll({
      where:
        {
          status: 0,
          originalLanguage: {[Op.in]: languages},
          translateLanguage: {[Op.in]: languages},
          tags: {[Op.contains]: tagsArray}
        }
    }).then(ordersArray => {
      res.json(ordersArray)
    });
  } catch (error) {
    res.status(400).json({error, message: 'Can not find any order'});
  }
});

router.get('/order/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let order = await orderModel.findOne({where: {id: id}});
    res.json(order);
  } catch (error) {
    res.status(400).json({error, message: 'Can not find any order'});
  }
});

router.delete('/order/:id', async (req, res) => {
  let id = req.params.id;

  let order = await orderModel.findOne({where: {id: id}}).then(order => order);
  let customer = await customerModel.findOne({where: {id: order.idCustomer}}).then(customer => customer);
  let translator = await translatorModel.findOne({where: {id: order.translatorId}}).then(translator => translator);

  if (order.status === 1) {
    let halfPrice = order.price / 2;

    customerModel.update({coins: customer.coins + halfPrice}, {where: {id: order.idCustomer}});
    translatorModel.update({coins: translator.coins + halfPrice}, {where: {id: order.translatorId}});

    orderModel.destroy({where: {id: id}});
    aggregationModel.destroy({where: {idOrder: id}});
  }
  ;

  let notification = await notificationModel.create({
    idCustomer: order.idCustomer,
    text: `Your order: ${order.title} was delete. Half the cost of the order send to the translator `
  });

  res.json(notification);
});

router.put('/order-review', async (req, res) => {
  let id = req.body.id;

  let order = await orderModel.findOne({where: {id: id}}).then((order) => {
    if (order.progress === 100) {
      let status = order.review ? 3 : 4;
      order.update({status: status, date: new Date()});
      res.json({message: 'Review done'});
    } else {
      order.update({date: new Date()});
      res.json({message: 'Review ne done'});
    }
  });
});

router.put('/order', async (req, res) => {
  let idOrder = req.body.id;
  let progress = req.body.progress;

  let order = await orderModel.findOne({where: {id: idOrder}}).then((order) => {
    if (progress === 100) {
      order.update({progress: progress, status: 2, date: new Date()});
    } else {
      order.update({progress: progress, date: new Date()});
    }
  });

  res.json({message: 'Progress was changed'});
});

router.get('/orders/translate/:idTranslator', async (req, res) => {
  const idTranslator = req.params.idTranslator;
  try {
    let orders = await orderModel.findAll(
      {where: {translatorId: idTranslator}, order: [['date', 'DESC']]})
      .then(order => res.json(order))
  } catch (error) {
    res.json({error, message: 'Can not find any order'});
  }
});


module.exports = router;
