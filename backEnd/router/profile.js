const express = require('express');
const router = express.Router();
const customerModel = require('../models/customer');
const translatorModel = require('../models/translator');
const tariffModel = require('../models/tariff');
const { validationResult } = require('express-validator');
const valid = require('../validators/validator');

router.get('/customer/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let profile = await customerModel.findOne({where: {id}}).then((customer) => {
      let data = {
        name: customer.name,
        email: customer.email,
        photo: customer.photo,
        coins: customer.coins,
        role: customer.role,
        tariff: customer.tariff
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
        coins: translator.coins,
      };
      res.json(data)
    });
  } catch (error) {
    res.json(error)
  }
});

router.put('/customer/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let data = {
      name: req.body.name,
      email: req.body.email,
      photo: req.body.photo
    };

    let profile = await customerModel.update(data, {returning: true, where: {id}});
    res.json({message: 'OK'})
  } catch (error) {
    res.json(error)
  }
});

router.put('/customer/:id/money', valid.checkMoneyAdd,  async (req, res) => {
  const { money, coins } = req.body;
  const id = req.params.id;
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();

  if (hasErrors) {
    res.json(result)
  }

  let customer = await customerModel.findOne({where: {id: id}}).then(customer => customer); 
  let tariff = await tariffModel.findOne({where: {name: customer.tariff}}).then(tariff => {
    let currentCoins = money * (2 - tariff.coeff) * 100;
    let resultMoney = customer.coins + currentCoins;

    if(currentCoins === coins) {
      customerModel.update({coins: resultMoney}, {where: {id: id}});
      res.json({msg: 'You get your money', resultMoney});
    } else {
      res.json({msg: 'money doesn\'t update '});
    }
  });
});

module.exports = router;
