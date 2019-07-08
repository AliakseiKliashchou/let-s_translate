const express = require('express');
const router = express.Router();

router.get('/customer', async(req, res) => {
    res.json({message: 'Profile'})
})

module.exports = router;