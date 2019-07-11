const express = require('express');
const router = express.Router();
const messageModel = require('../models/message');
const customerModel = require('../models/customer');

router.post('/message', async (req, res) => {
  let id = req.body.idCommentator;
  try {
    let photo = await customerModel.findOne({where: {id}}).then(customer => customer.photo);

    let message = await messageModel.create({
      senderEmail: req.body.senderEmail,
      role: req.body.role,
      idCommentator: req.body.idCommentator,
      idOrder: req.body.idOrder,
      name: req.body.name,
      photo: photo,
      message: req.body.message,
      date: req.body.date
    });
    res.json(message);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/message/:idOrder', async (req, res) => {
  let idOrder = req.params.idOrder;
  try {
    let message = await messageModel.findAll({where: {idOrder}});
    res.json(message);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
