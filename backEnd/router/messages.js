const express = require('express');
const router = express.Router();
const messageModel = require('../models/message');

router.post('/message', async(req, res) => {
  try {
    let message = await messageModel.create({
      role: req.body.role,
      idCommentator: req.body.idCommentator,
      idOrder: req.body.idOrder,
      name: req.body.name,
      message: req.body.message,
      date: req.body.date
    });
  
    res.json(message);
  } catch(error) {
    res.status(400).json(error);
  }
});

router.get('/message/:idOrder', async(req, res) => {
  let idOrder = req.params.idOrder;

  try {
    let findMessage = await messageModel.findAll({where: {idOrder}}).then((message) => {
      res.json(message);
    });
  } catch(error) {
    res.status(400).json(error);
  }
});

module.exports = router;