const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('| ---------- | API - Node.js + MongoDB | ---------- |');
});

module.exports = router;
