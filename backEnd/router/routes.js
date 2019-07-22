const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const auth = require('../controllers/auth');
const registration = require('../router/registrations');
const secure = require('./secure-routes');
const confirm = require('./confirm');
const tariff = require('./tariffs');

router.use('/', confirm);
router.post('/login', auth.login);
router.use('/secure', authMiddleware.checkToken, secure);
router.use('/create', registration);
router.use('/', tariff);

module.exports = router;
