const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const nodemailerMiddleware = require('../middlewares/nodemailer');
const auth = require('../controllers/auth');
const registration = require('../router/registrations');
const secure = require('./secure-routes');


router.post('/login', auth.login);
router.use('/secure', authMiddleware.checkToken, secure);
router.use('/create', nodemailerMiddleware.sendEmail, registration);

module.exports = router;
