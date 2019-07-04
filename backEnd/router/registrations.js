const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
// const translatorModel = require('../models/translator');
const customerModel = require('../models/customer');

router.post('/customer', async(req, res) => {
  // let user = req.body;
  // res.json({user})
  let user = await customerModel.create({
    role: req.body.role,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    verify: false,
    creditCard: req.body.creditCard,
    tariff: req.body.tariff
  });

  bcrypt.hash(user.password, 10).then((hash) => {
    user.password = hash;
    user.save().then((data) => {
      res.json({"user": data}) 
    });
  });
});

router.post('/translator', async(req, res) => {
  console.log(req.body)
  // let user = req.body;
  // res.json({user})
  // let user = await customerModel.create({
  //   role: req.body.role,
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  //   verify: false,
  //   creditCard: req.body.creditCard,
  //   tarif: req.body.tarif
  // });

  // bcypt.hash(user.password, 10).then((hash) => {
  //   user.password = hash;
  //   user.save().then((data) => { 
  //     console.log("DATA", data); 
  //     res.json({"user":user, "data": data}) 
  //   });
  // });
});

module.exports = router;
