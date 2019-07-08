const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const valid = require('../validators/validator');
const translatorModel = require('../models/translator');
const customerModel = require('../models/customer');

router.post('/translator', valid.validationRegistration, async(req, res) => {
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();

  if(hasErrors) {
    res.json({message: result})
  }

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
    res.status(400).json({message: error});
  }
});

router.post('/customer', valid.validationRegistration, async(req, res) => {
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();

  if(hasErrors) {
    res.json({message: result})
  }

  try {
    let customer = await customerModel.create({
      role: req.body.role,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      verify: false,
      creditCard: req.body.creditCard,
      tariff: req.body.tariff,
      photo: req.body.photo
    });
  
    bcrypt.hash(customer.password, 10).then((hash) => {
      customer.password = hash;
      customer.save().then((data) => {
        res.json({"customer": data});
      });
    });
  } catch(error) {
    res.status(400).json({message: error});
  }
});

module.exports = router;
