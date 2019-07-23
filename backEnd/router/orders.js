const express = require('express');
const router = express.Router();
const orderModel = require('../models/order');
const translatorModel = require('../models/translator');
const collectionModel = require('../models/collection');
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
    price: req.body.price,
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

router.get('/orders', async (req, res) => {
  const id = req.query.idCustomer;

  try {
    let orders = await orderModel.findAll({where: {idCustomer: id}});
    res.json(orders);
  } catch (error) {
    res.status(400).json({error, message: 'Can not find any order'});
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
  console.log(id)
  let order = await orderModel.destroy({where: {id: id}}).then((result) => {
    console.log(result)
    if (result === 1) {
      res.json({message: 'Deleted successfully!'});
    } else {
      res.status(404).json({message: 'Record not found!'})
    }
  })
});

router.put('/order', async (req, res) => {
  let idOrder = req.body.id;
  let progress = req.body.progress;

  let order = await orderModel.findOne({where: {id: idOrder}}).then((order) => {
    if (progress === 100) {
      const status = order.additionalReview ? 2 : 3;
      order.update({progress: progress, status: status, date: new Date()});
    } else {
      order.update({progress: progress, date: new Date()});
    }
  });

  res.json({message: 'Progress was changed'});
});

router.get('/orders/unowned', async (req, res) => {
  const idTranslator = req.query.idTranslator;
  try {
    let translator = await translatorModel.findOne({where: {id: idTranslator}});
    const languages = translator.languages;
    let orders = await orderModel.findAll(
      {
        where: {
          status: 0,
          originalLanguage: {[Op.in]: languages},
          translateLanguage: {[Op.in]: languages},
        }
      }).then(response => res.json(response));
  } catch (error) {
    res.json({message: error});
  }
});

router.get('/orders/translate/:idTranslator', async (req, res) => {
  const idTranslator = req.params.idTranslator;
  try {
    let orders = await orderModel.findAll(
      {where: {translatorId: idTranslator}, order: [['date', 'DESC']]})
      .then(order => res.json(order))
    // res.json(orders);
  } catch (error) {
    res.json({error, message: 'Can not find any order'});
  }
});


module.exports = router;
