const express = require("express");
const router = express.Router();
const orderTodoCollection = require('../DB/Schema').orderTodoSchema

router.post('/', (req, res) => {

    orderTodoCollection.findOne({ orderNum: req.body.orderNumToShow }, function (err, order) {
        if (err) {
            res.send({ msg: "no order with this number", order: "" });
        }
        else {
            if (order) {
                res.send({ msg: order.status, order: order })
            }
            else {

            }
        }
    });


})

module.exports = router;
