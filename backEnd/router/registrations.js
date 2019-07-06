const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
// const valid = require('../validators/validator'); // valid.loginValidator,
const translatorModel = require('../models/translator');
const customerModel = require('../models/customer');

router.post('/translator', async(req, res) => {
  try {
    let translator = await translatorModel.create({
      role: req.body.role,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      verify: false,
      languages: req.body.languages
    });
  
    bcrypt.hash(translator.password, 10).then((hash) => {
      translator.password = hash;
      translator.save().then((data) => {
        res.json({"translator": data});
      });
    });
  } catch(error) {
    res.status(400).json({message: 'Email address already in use!'});
  }
});

router.post('/customer', async(req, res) => {
  try {
    let customer = await customerModel.create({
      role: req.body.role,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      verify: false,
      creditCard: req.body.creditCard,
      tariff: req.body.tariff
    });
  
    bcrypt.hash(customer.password, 10).then((hash) => {
      customer.password = hash;
      customer.save().then((data) => {
        res.json({"customer": data});
      });
    });
  } catch(error) {
    res.status(400).json({message: 'Email address already in use!'});
  }
});

module.exports = router;