const Cryptr = require('cryptr');
const bcrypt = require('bcrypt');
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

  res.redirect('http://lets-translate.herokuapp.com/');
});

router.post('/forgot-password', async(req, res) => {
  let email = req.body.email;

  try {
    let customer = await customerModel.findOne({where: {email: email}}).then((customer) => {
      let info = {
        email: customer.email,
        id: customer.id,
        guid: customer.guid,
        date: new Date()
      };
  
      let jsonInfo = JSON.stringify(info);
      let encrypt = cryptr.encrypt(jsonInfo);
  
      nodemailer.resetPassword(encrypt, email);
      res.json({message: 'Settings for reset password have been sent!'})
    })
  } catch(error) {
    res.status(400).json({message: 'This email not found!'})
  }
});

router.get('/reset-password', async(req, res) => {
  let crypt = req.query.crypt;
  let decrypt = cryptr.decrypt(crypt);
  let data = JSON.parse(decrypt);
  let email = cryptr.encrypt(data.email);

  let customer = await customerModel.findOne({where: {id: data.id}}).then((customer) => {
    if(customer.guid === data.guid && (data.date < new Date() + 1)) { 
      res.redirect(`http://lets-translate.herokuapp.com/reset-password/${email}`)
    } else {
      res.json({message: 'Link is not available!'})
    }
  })

});

router.put('/reset-password', async(req, res) => {
  let password = req.body.password;
  let emailCrypt = req.body.email;
  let email = cryptr.decrypt(emailCrypt);

  let customer = await customerModel.findOne({where: {email: email}}).then((customer) => {
    bcrypt.hash(password, 10).then((hash) => {
      password = hash;
      customer.update({password: password});
    });
  });

  nodemailer.passwordChanged(email);
  res.json({message: 'Password was changed!'})
});

module.exports = router;
