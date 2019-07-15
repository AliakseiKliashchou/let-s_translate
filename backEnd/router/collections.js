const express = require('express');
const router = express.Router();
const orderModel = require('../models/order');
const collectionModel = require('../models/collection');

router.get('/:idCustomer', async(req, res) => {
  let id = req.params.idCustomer;
  try {
    let collections = await collectionModel.findAll({where: {idCustomer: id}}).then((collections) => {
      return collections;
    });

    for (let i = 0; i < collections.length; i++) {
      const idOrders = collections[i].idOrders;
      console.log(collections[i])
      let orders = await orderModel.findAll({where:{id:idOrders}}).then(order => {
        collections[i].idOrders = order;
      }) 
    }
    res.json(collections);
  } catch (error) {
    res.status(400).json({error, message: 'Can not find any collection'});
  }
});

module.exports = router;