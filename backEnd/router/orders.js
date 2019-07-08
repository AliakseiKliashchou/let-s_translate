const express = require('express');
const router = express.Router();
const orderModel = require('../models/order');

router.post('/order', async(req, res) => {
  try {
    let order = await orderModel.create({
      idCustomer: req.body.id,
      name: req.body.name,
      email: req.body.email,
      download: req.body.url,
      originalLanguage: req.body.initialLng,
      translateLanguage: req.body.finiteLng,
      tags: req.body.tags,
      title: req.body.title,
      urgency: req.body.urgency,
      review: req.body.additional_review,
      progress: 0,
      date: new Date()
    })

    res.json({message: 'Order is created!', order})
  } catch(error) {
    res.status(400).json({message: 'Order is not created!', error})
  }
});

router.get('/order', async(req, res) => {
  try {
    let orders = await orderModel.findAll({});
    res.json({message: 'Orders finded!', orders});
  } catch(error) {
    res.status(400).json({error, message: 'Can not find any order'});
  }
});

router.get('/order/:id', async(req, res) => {
  let id = req.params.id;
  try {
    let order = await orderModel.findOne({where: {id: id}})
    res.json({order});
  } catch(error) {
    res.status(400).json({error, message: 'Can not find any order'});
  }
});

router.put('/order', async(req, res) => {

});

router.delete('/order', async(req, res) => {

});

module.exports = router;