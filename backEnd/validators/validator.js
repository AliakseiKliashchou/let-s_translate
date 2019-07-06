const { check, validationResult } = require('express-validator');

const loginValidator = () => {
  check('email')
    .isEmail().withMessage('Email is invalid!')
    .isEmpty().withMessage('Email dont be empty')
}

module.exports = {
  loginValidator
}