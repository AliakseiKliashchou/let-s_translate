const {check, validationResult} = require('express-validator');

module.exports = {

  checkValid: [
    check('email')
      .isEmail().withMessage('Email is invalid!'),

    check('password')
      .isLength({min: 3}).withMessage('Password must be at minimum 3 characters in length.')
      .isLength({max: 10}).withMessage('Password must be at maximum 10 characters in length.')
  ]
};
