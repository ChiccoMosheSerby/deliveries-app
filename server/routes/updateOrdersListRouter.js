const express = require("express");
const router = express.Router();
const orderTodoCollection = require('../DB/Schema').orderTodoSchema

router.post('/', (req, res) => {

    console.log("after : const updateOrderCollection = db.collection(orders)");

    var myquery = { 'orderNum': req.body.orderNum };
    var newvalues = { $set: { 'status': 'done' } };
    orderTodoCollection.updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
    });
    res.send() 

})

module.exports = router;
