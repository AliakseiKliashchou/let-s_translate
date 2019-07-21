const express = require('express');
const router = express.Router();
const translatorModel = require('../models/translator');
const customerModel = require('../models/customer');
const adminModel = require('../models/admin');
const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');
const { validationResult } = require('express-validator');
const valid = require('../validators/validator');
const nodemailer = require('../configs/nodemailer');

router.post('/admin', valid.checkValid, async (req, res) => {
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();

  if (hasErrors) {
    res.json(result);
  }

  try {
    let admin = await adminModel.create({
      role: 'admin',
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    bcrypt.hash(translator.password, 10).then((hash) => {
      translator.password = hash;
      translator.save().then((data) => {
        res.json({ "translator": data });
      });
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/translator', valid.checkValid, async (req, res) => {
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();

  if (hasErrors) {
    res.json(result)
  }

  try {
    let translator = await translatorModel.create({
      role: req.body.role,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      languages: req.body.languages,
      coins: 1000,
    });

    bcrypt.hash(translator.password, 10).then((hash) => {
      translator.password = hash;
      translator.save().then((data) => {
        res.json({ "translator": data });
      });
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/customer', valid.checkValid, async (req, res) => {
  console.log(req.body)
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();
  let coins = 1000;
  let coeff = 1;
  switch (req.body.tariff) {
    case 'silver':
      coins = 1000;
      coeff = 0.9;
      break;
    case 'gold':
      coins = 5000;
      coeff = 0.7;
      break;
    case 'platinum':
      coins = 10000;
      coeff = 0.5;
      break; 
  }
  if (hasErrors) {
    res.json(result)
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
      photo: req.body.photo,
      guid: uuidv1(),
      coins: coins,
      coeff: coeff,
    });

    bcrypt.hash(customer.password, 10).then((hash) => {
      customer.password = hash;
      customer.save().then((data) => {
        res.json({ "customer": data });
      });
    });

    nodemailer.sendEmail(customer.guid, customer.id);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
