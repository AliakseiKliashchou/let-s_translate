const express = require('express');
const router = express.Router();
const customerModel = require('../models/customer');
const translatorModel = require('../models/translator');

router.get('/customer', async(req, res) => {
  let id = req.query.id
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

module.exports = router;