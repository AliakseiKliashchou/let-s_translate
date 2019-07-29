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
  let order;
  const {
    idCustomer, name, email, additionalReview: review, title, urgency,
    finiteLng: translateLanguage, initialLng: originalLanguage, tags
  } = req.body;
  let ordersInfo = {
    idCustomer,
    name,
    email,
    originalLanguage,
    translateLanguage,
    tags,
    title,
    urgency,
    review,
    download: '',
    status: 0,
    progress: 0,
    date: new Date(),
    isCollections: false,
    oneTranslator: false,
    price: 100
  };
  try {
    if (urls.length > 1) {
      let ordersArray = [];
      const lng = [translateLanguage, originalLanguage];
      for (let i = 0; i < urls.length; i++) {
        ordersInfo.download = urls[i];
        ordersInfo.isCollections = true;
        let order = await orderModel.create(ordersInfo);
        ordersArray.push(order.id);
      }
      let collection = collectionModel.create({
        idOrders: ordersArray,
        title: title,
        idCustomer: idCustomer,
        lng: lng,
        status: 0,
        oneTranslator: false,
        date: new Date()
      });
    } else {
      ordersInfo.download = urls[0];
      order = await orderModel.create(ordersInfo);
    }
    res.json({message: 'Order is created!'})
  } catch (error) {
    console.log('error')
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
    let collections = await collectionModel.findAll({
      where: {
        status: {[Op.in]: status},
        lng: {[Op.in]: languages},
        oneTranslator: true
      }
    }).then(colls => {
      for (let i = 0; i < colls.length; i++) {
        const idOrders = colls[i].idOrders;
        orderModel.findAll({where: {id: idOrders}}).then(order => {
          colls[i].idOrders = order;
        })
      }
      return colls;
    });
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
          if (el.status === 2 && el.isCollections && el.oneTranslator) return el;
          else if (!(el.isCollections && el.oneTranslator)) return el;
        });
        const newSmth = newArray.concat(collections);
        res.json(newSmth);
      } else res.json({msg: 'You don\'t have work'})
    });
  } catch (error) {
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
    let collections = await collectionModel.findAll({
      where: {
        status: 0,
        lng: {[Op.in]: languages},
        oneTranslator: true
      }
    });

    let orders = await orderModel.findAll({
      where:
        {
          status: 0,
          originalLanguage: {[Op.in]: languages},
          translateLanguage: {[Op.in]: languages},
          tags: {[Op.contains]: tagsArray}
        }
    }).then(ordersArray => {
      if (ordersArray) {
        const newArray = ordersArray.filter(el => !(el.isCollections && el.oneTranslator));
        const newSmth = newArray.concat(collections);
        res.json(newSmth);
      }
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
    let status = (order.review) ? 2 : 3;
    if (progress === 100) {
      order.update({progress: progress, status: status, date: new Date()});
    } else {
      order.update({progress: progress, date: new Date()});
    }
  });

  res.json({message: 'Progress was changed'});
});

router.get('/orders/translate/:idTranslator', async (req, res) => {
  const idTranslator = req.params.idTranslator;
  const status = [1, 2, 3];
  try {
    orderModel.findAll(
      {
        where: {translatorId: idTranslator, status: {[Op.in]: status}},
        order: [['date', 'ASC']]
      })
      .then(order => res.json(order))
  } catch (error) {
    res.json({error, message: 'Can not find any order'});
  }
});


module.exports = router;
