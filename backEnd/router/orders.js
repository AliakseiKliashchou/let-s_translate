const express = require('express');
const router = express.Router();
const orderModel = require('../models/order');

const collectionModel = require('../models/collection');


router.post('/order', async (req, res) => {
  let urls = req.body.url;
  try {
    if(urls.length > 1) {
      let ordersArray = [];

      for(let i = 0; i < urls.length; i++) {
        let order = await orderModel.create({
          idCustomer: req.body.id,
          name: req.body.name,
          email: req.body.email,
          download: urls[i],
          originalLanguage: req.body.initialLng,
          translateLanguage: req.body.finiteLng,
          tags: req.body.tags,
          title: req.body.title,
          urgency: req.body.urgency,
          review: req.body.additionalReview,
          progress: 0,
          date: new Date()
        });
        ordersArray.push(order.id);
      }

      let collection = collectionModel.create({
        idOrders: ordersArray,
        title: req.body.title,
        idCustomer: req.body.id
      });
      
    } else {
      let order = await orderModel.create({
        idCustomer: req.body.id,
        name: req.body.name,
        email: req.body.email,
        download: urls[0],
        originalLanguage: req.body.initialLng,
        translateLanguage: req.body.finiteLng,
        tags: req.body.tags,
        title: req.body.title,
        urgency: req.body.urgency,
        review: req.body.additionalReview,
        progress: 0,
        date: new Date()
      });
    }

    res.json({message: 'Orders is created!'})
  } catch (error) {
    res.status(400).json({message: 'Order is not created!', error})
  }
});

router.get('/order', async (req, res) => {
  try {
    let orders = await orderModel.findAll({});
    res.json(orders);
  } catch (error) {
    res.status(400).json({error, message: 'Can not find any order'});
  }
});

router.get('/collections/:idCustomer', async (req, res) => {
  let id = req.params.idCustomer;
  try {
    let orders = await collectionModel.findAll({where: {idCustomer: id }});
    res.json(orders);
  } catch (error) {
    res.status(400).json({error, message: 'Can not find any order'});
  }
});

router.get('/order/unowned', async(req, res) => {
  try {
    let orders = await orderModel.findAll({where: {progress: 0}});
    res.json(orders);
  } catch(error) {
    res.json({message: error});
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

router.put('/order', async (req, res) => {

});

router.delete('/order', async (req, res) => {
  let id = req.query.id;

  let order = await orderModel.destroy({where: {id}}).then((result) => {
    if(result === 1) {
      res.json({message: 'Deleted successfully!'});
    } else {
      res.status(404).json({message: 'Record not found!'})
    }
  })
});

module.exports = router;
