const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const translatorModel = require('../models/translator');
const customerModel = require('../models/customer');
const {jwtSecret} = require('../configs/jwt');

const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

  switch (role) {
    case 'customer':
    case 'admin':
      customer();
      break;
    case 'translator':
      translator();
      break;
  }

  function customer() {
    customerModel.findOne({where: {email: email}}).then((customer) => {
      if(!customer) res.status(401).json({message: 'User does not exist!'});
      if(customer.verify) {
        const isValid = bcrypt.compareSync(password, customer.password);
        if(isValid) {
          const tokenData = {
            id: customer.id,
            email: customer.email, 
            role: customer.role
          }
          const token = jwt.sign(tokenData, jwtSecret);
          // const decode = jwt.decode(token); 
          // console.log(decode);
          res.json({token, name: customer.name});
        } else {
          res.status(401).json({message: 'Invalid credentials!'})
        }
      } else {
        res.status(401).json({message: 'You are not authorized! Please check your email'});
      }
    }).catch(err => res.json({err}));
  }

  function translator() {
    translatorModel.findOne({where: {email: email}}).then((translator) => {
      if (!translator) res.status(401).json({message: 'User does not exist!'});

      const isValid = bcrypt.compareSync(password, translator.password);
      if (isValid) {
        const tokenData = {
          id: translator.id,
          email: translator.email, 
          role: translator.role
        }
        const token = jwt.sign(tokenData, jwtSecret);
        res.json({token, name: translator.name})
      } else {
        res.status(401).json({message: 'Invalid credentials!'})
      }
    }).catch(err => res.status(500).json(err));
  }
};

module.exports = {login};
