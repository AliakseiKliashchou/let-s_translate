const express = require('express');
const router = express.Router();
const messageModel = require('../models/message');
const customerModel = require('../models/customer');

router.post('/message', async (req, res) => {
  let id = req.body.idCommentator;
  console.log(id)
  // res.json(req.body)
  try {
    let photo = 'https://firebasestorage.googleapis.com/v0/b/letstranslate-ca941.appspot.com/o/toTranslate%2F1564131873490_Google-Noto-Emoji-Animals-Nature-22235-pig-face.ico?alt=media&token=cb0f0124-5e18-4039-97af-5ad8256b4776';
    if (req.body.role === 'customer'){
      let photo = await customerModel.findOne({where: {id}}).then(customer => customer.photo);
    }

    let message = await messageModel.create({
      senderEmail: req.body.senderEmail,
      role: req.body.role,
      idCommentator: req.body.idCommentator,
      idOrder: req.body.idOrder,
      name: req.body.name,
      photo: photo ,
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
