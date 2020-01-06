const menu = require('../DB/menu');
const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {

    res.send({
        mainDishes: menu.mainDishes,
        sideDishes: menu.sideDishes,
        diserts: menu.diserts
    })
})

module.exports = router;
