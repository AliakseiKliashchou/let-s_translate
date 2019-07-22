const express = require('express');
const router = express.Router();
const translatorModel = require('../models/translator');
const customerModel = require('../models/customer');
const tariffModel = require('../models/tariff');
const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');
const { validationResult } = require('express-validator');
const valid = require('../validators/validator');
const nodemailer = require('../configs/nodemailer');

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
      languages: req.body.languages
    });

    bcrypt.hash(translator.password, 10).then((hash) => {
      translator.password = hash;
      translator.save().then((data) => {
        res.json({"translator": data});
      });
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/customer', valid.checkValid, async (req, res) => {
  let tariff = req.body.tariff;
  let coins;
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();

  if (hasErrors) {
    res.json(result)
  }

  let tariffInfo = await tariffModel.findOne({where: {name: tariff}}).then((info) => {
    return coins = info.coins;
  });

  try {
    let customer = await customerModel.create({
      role: req.body.role,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      verify: false,
      creditCard: req.body.creditCard,
      tariff: tariff,
      photo: req.body.photo,
      guid: uuidv1(),
      coins: coins
    });

    bcrypt.hash(customer.password, 10).then((hash) => {
      customer.password = hash;
      customer.save().then((data) => {
        res.json({"customer": data});
      });
    });

    nodemailer.sendEmail(customer.guid, customer.id);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
