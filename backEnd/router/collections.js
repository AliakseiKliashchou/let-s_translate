const express = require('express');
const router = express.Router();
const orderModel = require('../models/order');
const collectionModel = require('../models/collection');

router.get('/:idCustomer', async(req, res) => {
  let id = req.params.idCustomer;
  let idOrder;
  try {
    let orders = await collectionModel.findOne({where: {idCustomer: id }}).then((order) => {
      idOrder = order.idOrders.map(el => el);
    });
    
    let orderInfo = await orderModel.findAll({where: {id: idOrder}})

    res.json(orderInfo);
  } catch (error) {
    res.status(400).json({error, message: 'Can not find any collection'});
  }
});

module.exports = router;