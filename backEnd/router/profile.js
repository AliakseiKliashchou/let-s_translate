const express = require('express');
const router = express.Router();
const customerModel = require('../models/customer');
const translatorModel = require('../models/translator');

router.get('/customer/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let profile = await customerModel.findOne({where: {id}}).then((customer) => {
      let data = {
        name: customer.name,
        email: customer.email,
        photo: customer.photo,
        coins: customer.coins,
      };
      res.json(data)
    });
  } catch (error) {
    res.json(error)
  }
});

router.get('/translator/:id', async (req, res) => {
  let id = req.params.id;

  try {
    let profile = await translatorModel.findOne({where: {id}}).then((translator) => {
      let data = {
        name: translator.name,
        email: translator.email,
        languages: translator.languages,
        photo: translator.photo,
        coins: customer.coins,
      };
      res.json(data)
    });
  } catch (error) {
    res.json(error)
  }
});

router.put('/customer/:id', async (req, res) => {
  res.json(req.body.photo);


  let id = req.params.id;
  try {
    let data = {
      name: req.body.name,
      email: req.body.email,
      photo: req.body.photo
    };

    let profile = await customerModel.update(data, {returning: true, where: {id}});
    res.json({message: 'OK', profile})
  } catch (error) {
    res.json(error)
  }
});

module.exports = router;
