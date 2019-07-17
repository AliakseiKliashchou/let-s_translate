const express = require('express');
const router = express.Router();
const orderModel = require('../models/order');
const collectionModel = require('../models/collection');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/get-by-user/:idCustomer', async (req, res) => {
  let id = req.params.idCustomer;
  try {
    let collections = await collectionModel.findAll({where: {idCustomer: id}}).then((collections) => {
      return collections;
    });

    for (let i = 0; i < collections.length; i++) {
      const idOrders = collections[i].idOrders;
      let orders = await orderModel.findAll({where: {id: idOrders}}).then(order => {
        collections[i].idOrders = order;
      })
    }
    res.json(collections);
  } catch (error) {
    res.status(400).json({error, message: 'Can not find any collection'});
  }
});

router.get('/by-params', async (req, res) => {
  const {review, tags, translateLanguage, originalLanguage} = req.query;
  let tagsArray = [];
  if (tags.length) tagsArray = tags.split(',');
  orderModel.findAll(
    {
      where:
        {
          originalLanguage: {[Op.like]: originalLanguage},
          translateLanguage: {[Op.like]: translateLanguage},
          tags: {[Op.contains]: tagsArray},
          review: review
        }
    })
    .then(ordersArray => res.json(ordersArray))
});

module.exports = router;

