const { check, validationResult } = require('express-validator');

module.exports = {

  validationRegistration: [
    check('email')
      .isEmail().withMessage('Email is invalid!'),

    check('password')
      .isLength({ min:8 }).withMessage('Password must be at least 8 characters in length.')
      .matches('\[0-9\]').withMessage('Password must contain at least 1 number.')
      .matches('\[a-z\]').withMessage('Password must contain at least 1 lowercase letter.')
      .matches('\[A-Z\]').withMessage('Password must contain at least 1 uppercase letter.')
  ]
}