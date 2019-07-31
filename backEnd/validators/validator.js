const {check, validationResult} = require('express-validator');

module.exports = {

  checkValid: [
    check('email')
      .isEmail().withMessage('Email is invalid!'),

    check('password')
      .isLength({min: 3}).withMessage('Password must be at minimum 3 characters in length.')
      .isLength({max: 10}).withMessage('Password must be at maximum 10 characters in length.')
  ],
  checkCoins: [
    check('coins')
      .not().isEmpty().withMessage('Cost do not be empty')
      .trim()
      .toInt().withMessage('Only integers')
      .matches(/^[0-9]+$/).withMessage('Must contain only positive numbers'),

    check('cost')
      .not().isEmpty().withMessage('Cost do not be empty')
      .trim()
      .toInt().withMessage('Only integers')
      .matches(/^[0-9]+$/).withMessage('Must contain only positive numbers'),

    check('coeff')
      .not().isEmpty().withMessage('Coins do not be empty')
      .trim()
      .isFloat({min: 0.1}).withMessage('Min coeff is 0.1')
      .isFloat({max: 0.9}).withMessage('Max coeff is 0.9')
  ]
};
