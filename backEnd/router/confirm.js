const express = require('express');
const router = express.Router();
const customerModel = require('../models/customer');

router.get('/confirm', async(req, res) => {
  let guid = req.query.code;
  let id = req.query.id;

  let customer = await customerModel.findOne({where: {id}}).then((customer) => {
    if(customer.guid === guid) {
      customer.update({verify: true});
    }
  })

  res.redirect('http://localhost:4200');
})

module.exports = router;