const express = require("express");
const router = express.Router();

const mongoose = require('mongoose');//npm i mongoose
const url = "mongodb://chicco:qqwwee123@cluster0-shard-00-00-hn1ba.mongodb.net:27017,cluster0-shard-00-01-hn1ba.mongodb.net:27017,cluster0-shard-00-02-hn1ba.mongodb.net:27017/TST?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin";
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connection to DB succeed !<-------order status for tracking----------------------------');
});

router.post('/', (req, res) => {

    const orderCollection = db.collection('orders');
    orderCollection.findOne({ orderNum: req.body.orderNumToShow }, function (err, order) {
        if (err) {
            res.send({ msg: "no order with this number", order: "" });
        }
        else {
            if (order) {
                res.send({ msg: order.status, order: order })
            }
            else{

            }
        }
    });


})

module.exports = router;
