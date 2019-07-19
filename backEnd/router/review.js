const express = require('express');
const router = express.Router();
const orderModel = require('../models/order');

router.get('/', async(req, res) => {
    let orderStatus = await orderModel.findAll({where: {review: true, status: 2}}).then((result) => {
        return result;
    })

    res.json(orderStatus);
});

module.exports = router;