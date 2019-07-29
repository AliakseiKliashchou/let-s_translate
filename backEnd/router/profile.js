const express = require('express');
const router = express.Router();
const customerModel = require('../models/customer');
const translatorModel = require('../models/translator');
const tariffCoeff = {
  'platinum': 1.5 * 100,
  'gold': 1.3 * 100,
  'silver': 1.1 * 100
};

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

router.put('/customer/:id/money', async (req, res) => {
  const {money} = req.body;
  const id = req.params.id;
  customerModel.findOne({where: {id: id}})
    .then(user => {
      const tariff = user.tariff;
      const currentMoney = money * tariffCoeff[tariff];
      const resultMoney = user.coins + currentMoney;
      user.update({coins: resultMoney})
        .then(() => res.json({msg: 'You get your money', resultMoney}))
        .catch(err => res.json({msg: 'money doesn\'t update ', err}))
    }).catch(err => res.json({msg: 'User doesn\'t exist', err}));
});


module.exports = router;
