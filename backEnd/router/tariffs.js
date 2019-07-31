const express = require('express');
const router = express.Router();
const tariffModel = require('../models/tariff');
const { validationResult } = require('express-validator');
const valid = require('../validators/validator');

router.get('/tariff', async(req, res) => {
  try {
    let tariffs = await tariffModel.findAll({order:[['id','ASC']]});
    res.json(tariffs);
  } catch(error) {
    res.json({message: 'No one tariff is not found!', error})
  }
});

router.put('/secure/tariff', valid.checkCoins, async(req, res) => {
  let { name, cost, coins, coeff } = req.body;
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();

  try {
    let tariffs = await tariffModel.findOne({where: {name: name}}).then((info) => {
      if(hasErrors) { 
        res.status(400).json(result) 
      } else {
        info.update({cost: cost, coins: coins, coeff: coeff});
      }
    });
  
    res.json({message: 'Tariff successfully updated!'});
  } catch(error) {
    res.json({message: 'Something was wrong! Try again.', error});
  }
});

module.exports = router;
