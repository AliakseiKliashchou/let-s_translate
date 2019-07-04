const express = require('express');
const router = express.Router();

router.post('/text', (req, res) => {
    res.json({message: 'OK SECURE TEXT'})
})

module.exports = router;