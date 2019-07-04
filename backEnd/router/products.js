const express = require('express');
const router = express.Router();

router.post('/product', (req, res) => {
    res.json({message: 'OK SECURE'})
})

module.exports = router;