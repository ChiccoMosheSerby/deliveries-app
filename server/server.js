const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const cors = require('cors');

const mongoose = require('mongoose');//npm i mongoose
// var path = require('path');

//connect mongoDB
// const url = "mongodb://localhost:27017/newDb";
const url = "mongodb://chicco:qqwwee123@cluster0-shard-00-00-hn1ba.mongodb.net:27017,cluster0-shard-00-01-hn1ba.mongodb.net:27017,cluster0-shard-00-02-hn1ba.mongodb.net:27017/TST?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin";
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;

//(prodactName, productPrice, productCost, productCategoties, isAvailible,
// shirtDescription, shirtSize, shirtMainColor, shirtImg)
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('we are connected!');
});

//Define a schema
const Schema = mongoose.Schema;
const orderTodoSchema = new Schema({
    orderItemsList: Array,
    selectedBranch: String,
    DeleiveryOrTakeAway: String,
    clientStreet: String,
    clientStreetNumber: Number,
    clientPhoneNumber: String,
    clientName: String,
    clientEmail: String,
    paymentType: String,
    isManager: Boolean,
    orderTime: String,
    total: Number,
    orderNum: String,
    status: String
});

const orderTodoCollection = mongoose.model('orders', orderTodoSchema);


//DB
const branches = require('../client/src/view/DB/branches.js');
const menu = require('../client/src/view/DB/menu.js');



app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

function uniqid() {
    return Math.random().toString(16).slice(2) + (new Date()).getTime() + Math.random().toString(16).slice(2);
}

// let orderTodoList = [];
app.post('/updateOrdersList', (req, res) => {
    orderTodoList = req.body;
    res.send(orderTodoList);

})
//First Page : newOrder
app.post('/newOrder', (req, res) => {

    let newOrder = req.body;
    if (newOrder.selectedBranch &&
        newOrder.DeleiveryOrTakeAway &&
        newOrder.paymentType &&
        newOrder.orderTime &&
        newOrder.total) {
        newOrder.orderNum = uniqid();
        newOrder.status = 'new';

        //Add order to DB
        orderTodoDoc = new orderTodoCollection(newOrder);
        orderTodoDoc.save().then(doc => {
            console.log('added: ', docs)

            // res.send(doc);
        })

    }

        //get all orders to DB
    orderTodoCollection.find((err, docs) => {
        if (err) {
            throw err;
        }
        else {
            console.log('found', docs)
            // Contacts = docs;
            res.send(docs);
        }
    })

})
//First Page : get branches
app.post('/branches', (req, res) => {

    res.send({ branches })
})

//add food to order Page : get menu
app.post('/menu', (req, res) => {

    res.send({
        mainDishes: menu.mainDishes,
        sideDishes: menu.sideDishes,
        diserts: menu.diserts
    })
})

let port = process.env.PORT || 4000;

app.listen(port, function () {
    console.log('we are on - server side', port)
}) 