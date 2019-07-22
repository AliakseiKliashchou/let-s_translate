const express = require('express');
const router = express.Router();
const tariffModel = require('../models/tariff');

router.get('/', async(req, res) => {
  try {
    let tariffs = await tariffModel.findAll({});
    res.json(tariffs);
  } catch(error) {
    res.json({message: 'No one tariff is not found!', error})
  }
});

router.put('/secure/', async(req, res) => {
  let { name, cost, coins, coeff } = req.body;


  try {
    let tariffs = await tariffModel.findOne({where: {name: name}}).then((info) => {
      info.update({cost: cost, coins: coins, coeff: coeff});
    });
  
    res.json({message: 'Tariff successfully updated!'});
  } catch(error) {
    res.json({message: 'Something was wrong! Try again.', error});
  }
});

module.exports = router;