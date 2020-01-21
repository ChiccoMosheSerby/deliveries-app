const express = require("express");
const router = express.Router();
const orderTodoCollection = require('../DB/Schema').orderTodoSchema

router.post('/', (req, res) => {
    orderTodoCollection.find({status:"new"},(err, list) => {
        console.log('.....................................')
    console.log(list)
        if (err) throw err;
        res.send({ list:list });
    })
})

module.exports = router;
