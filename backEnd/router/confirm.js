const Cryptr = require('cryptr');
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
      id: customer.id,
      guid: customer.guid,
      date: new Date()
    }

    let encrypt = cryptr.encrypt(info);
    // console.log(encrypt);
    let decrypt = cryptr.decrypt(encrypt);
    decrypt.toString();
    res.json(decrypt)

    // nodemailer.resetPassword(encrypt);
  })
})

// router.post('/reset-password', async(req, res) => {
//   let guid = req.query.code;
//   let id = req.query.id;

//   let customer = await customerModel.findOne({where: {id}}).then((customer) => {
//     if(customer.guid === guid) {

//       bcrypt.hash(customer.password, 10).then((hash) => {
//         customer.password = hash;
//         customer.save().then((data) => {
//           res.json({"customer": data});
//         });
//       });

//       customer.update({password: customer.password});
//     }
//   })
// })

module.exports = router;
