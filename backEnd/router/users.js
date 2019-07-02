const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');

router.post('/create/user', passport.authenticate('createUser', { session: false  }), async(req, res, next) => {
  res.json({
    message: 'Signup successful Manager',
    'isFind': true,
    user: req.user
  });
});

// router.post('/registration', (req, res) => {
//   User.create({
//     email: "t@r.or",
//     password: "123",
//     name: "Olya",
//     role: "Translator",
//     verify: false,
//     languages: ['English', 'Russian'],
//   })

//   res.json({"OK": "OK"})
// })



module.exports = router;