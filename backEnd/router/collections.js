const express = require('express');
const router = express.Router();
const orderModel = require('../models/order');
const collectionModel = require('../models/collection');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/get-by-user/:idCustomer', async (req, res) => {
  let id = req.params.idCustomer;
  try {
    let collections = await collectionModel.findAll({where: {idCustomer: id}})
      .then((collections) => {
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
  const {review, tags, translateLanguage, originalLanguage, idCustomer} = req.query;
  let tagsArray = [];
  if (tags.length) tagsArray = tags.split(',');
  orderModel.findAll(
    {
      where:
        {
          originalLanguage: {[Op.like]: originalLanguage},
          translateLanguage: {[Op.like]: translateLanguage},
          tags: {[Op.contains]: tagsArray},
          review: review,
          isCollections: false,
          idCustomer: idCustomer
        }
    })
    .then(ordersArray => res.json(ordersArray))
});

router.post('/create', async (req, res) => {
  const {idOrders, tittle, idCustomer, oneTranslator, lng} = req.body;
  orderModel.findAll({where: {id: idOrders}}).then(orders => {
    orders.forEach(el => {
      el.update({isCollections: true, oneTranslator: oneTranslator})
    });
  });
  collectionModel.create({
    idOrders: idOrders,
    title: tittle,
    idCustomer: idCustomer,
    oneTranslator: oneTranslator,
    lng: lng
  }).then(result => res.json(result));
});

router.delete('/delete/:idCollection', async (req, res) => {
  const idCollection = req.params.idCollection;
  let flag = await collectionModel.findOne({where: {id: idCollection}})
    .then(collection => {
        const idOrders = collection.idOrders;
        orderModel.findAll({where: {id: idOrders}})
          .then(result => {
            result.forEach(el => el.update({isCollections: false}))
          });
      }
    );
  let order = await collectionModel.destroy({where: {id: idCollection}}).then((result) => {
    if (result === 1) {
      res.json({message: 'Deleted successfully!'});
    } else {
      res.status(404).json({message: 'Record not found!'})
    }
  })


});

module.exports = router;

