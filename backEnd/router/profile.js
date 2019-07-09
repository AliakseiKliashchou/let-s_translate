const express = require('express');
const router = express.Router();
const customerModel = require('../models/customer');
const translatorModel = require('../models/translator');

router.get('/customer/:id', async(req, res) => {
  let id = req.params.id;

  try {
    let profile = await customerModel.findOne({where: {id}}).then((customer) => {
      let data = {
        name: customer.name,
        email: customer.email,
        photo: customer.photo
      }
      res.json({data})
    });
  } catch(error) {
    res.json({message: error})
  }
});

router.get('/translator/:id', async(req, res) => {
  let id = req.params.id;

  try {
    let profile = await translatorModel.findOne({where: {id}}).then((translator) => {
      let data = {
        name: translator.name,
        email: translator.email,
        languages: translator.languages,
        photo: translator.photo
      }
      res.json({data})
    });
  } catch(error) {
    res.json({message: error})
  }
});

module.exports = router;