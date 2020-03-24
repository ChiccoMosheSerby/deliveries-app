const menu = require('../DB/menu');
const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {

    res.send(menu)
})

module.exports = router;
