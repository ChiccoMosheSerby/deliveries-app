const express = require("express");
const router = express.Router();

const mongoose = require('mongoose');//npm i mongoose
const url = "mongodb://chicco:qqwwee123@cluster0-shard-00-00-hn1ba.mongodb.net:27017,cluster0-shard-00-01-hn1ba.mongodb.net:27017,cluster0-shard-00-02-hn1ba.mongodb.net:27017/TST?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin";
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connection to DB succeed !<-------update status----------------------------');
});

router.post('/', (req, res) => {

    const updateOrderCollection = db.collection('orders');
    console.log("after : const updateOrderCollection = db.collection(orders)");

    var myquery = { 'orderNum': req.body.orderNum };
    var newvalues = { $set: { 'status': 'done' } };
    updateOrderCollection.updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
    });
    res.send() 

})

module.exports = router;
