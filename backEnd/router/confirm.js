const Cryptr = require('cryptr');
const bcrypt = require('bcrypt')
const express = require('express');
const router = express.Router();
const cryptr = new Cryptr('myTotalySecretKey');
const customerModel = require('../models/customer');
const nodemailer = require('../configs/nodemailer');

router.get('/confirm', async(req, res) => {
  let guid = req.query.code;
  let id = req.query.id;

  let customer = await customerModel.findOne({where: {id}}).then((customer) => {
    if(customer.guid === guid) {
      customer.update({verify: true});
    }
  });

  res.redirect('http://localhost:4200');
});

router.post('/forgot-password', async(req, res) => {
  let email = req.body.email;

  let customer = await customerModel.findOne({where: {email: email}}).then((customer) => {
    let info = {
      email: customer.email,
      id: customer.id,
      guid: customer.guid,
      date: new Date()
    }

    let jsonInfo = JSON.stringify(info);
    let encrypt = cryptr.encrypt(jsonInfo);

    nodemailer.resetPassword(encrypt);
  })
})

router.get('/reset-password', async(req, res) => {
  let crypt = req.query.crypt;
  let decrypt = cryptr.decrypt(crypt);
  let data = JSON.parse(decrypt);


  let customer = await customerModel.findOne({where: {id: data.id}}).then((customer) => {
    if(customer.guid === data.guid && data.date < new Date()) { 
      res.redirect('http://localhost:4200/reset-password')
    } else {
      res.json({message: 'Link is not available!'})
    }
  })

});

router.post('/reset-password', async(req, res) => {
  let password = req.body.password;
  let email = req.body.email;

  let customer = await customerModel.findOne({where: {email: email}}).then((customer) => {
    bcrypt.hash(password, 10).then((hash) => {
      password = hash;
      customer.update({password: password});
      res.json({customer})
    });
  });

  nodemailer.passwordChanged();
});

module.exports = router;
