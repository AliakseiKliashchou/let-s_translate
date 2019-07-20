const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const translatorModel = require('../models/translator');
const customerModel = require('../models/customer');
const { jwtSecret } = require('../configs/jwt');

const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  
  switch(role) {
    case 'customer': 
      customer();
      break;
    case 'translator':
      translator();
      break;
    default:
      res.json({message: "ERROR BLYAT"})
  }

  function customer() {
    customerModel.findOne({where: {email: email}}).then((customer) => {
      if(!customer) res.status(401).json({message: 'User does not exist!'});

      const isValid = bcrypt.compareSync(password, customer.password);
      if(isValid) {
        const token = jwt.sign(customer.id.toString(), jwtSecret);
        res.json({ 
          token, 
          id: customer.id,
          name: customer.name, 
          email: customer.email, 
          role: customer.role,
          isFind: true
        })
      } else {
        res.status(401).json({message: 'Invalid credentials!'})
      }
    }).catch(err => res.status(500).json(err));
  }

  function translator() {
    translatorModel.findOne({where: {email: email}}).then((translator) => {
      if(!translator) res.status(401).json({message: 'User does not exist!'});

      const isValid = bcrypt.compareSync(password, translator.password);
      if(isValid) {
        const token = jwt.sign(translator.id.toString(), jwtSecret);
        res.json({ 
          token, 
          id: translator.id, 
          name: translator.name,
          email: translator.email, 
          role: translator.role,
          isFind: true 
        })
      } else {
        res.status(401).json({message: 'Invalid credentials!'})
      }
    }).catch(err => res.status(500).json(err));
  }
};

module.exports = { login };
