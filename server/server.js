const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());


//connect mongoDB---------------------------------------------------------------
const mongoose = require('mongoose');//npm i mongoose
const url = "mongodb://chicco:qqwwee123@cluster0-shard-00-00-hn1ba.mongodb.net:27017,cluster0-shard-00-01-hn1ba.mongodb.net:27017,cluster0-shard-00-02-hn1ba.mongodb.net:27017/TST?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin";
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connection to DB succeed !<--------------MAIN - server.js---------------------');
});



//////////---------end DB---------------------------------------------------------

//branches route---------------
const branchesRouter = require('./routes/branchesRouter');
app.use("/branches", branchesRouter);

// menu route------------------
const menuRouter = require('./routes/menuRouter');
app.use("/menu", menuRouter);

// newOrder route
const ordersRouter = require('./routes/ordersRouter');
app.use("/newOrder", ordersRouter);

// update order status route
const updateOrdersListRouter = require('./routes/updateOrdersListRouter');
app.use("/updateOrdersList", updateOrdersListRouter);
 
// show order status route
const orderStatusToShowRouter = require('./routes/orderStatusToShowRouter');
app.use("/orderStatusToShow", orderStatusToShowRouter);

//get Order List
const getOrderListRouter = require('./routes/getOrderListRouter');
app.use("/getOrderList", getOrderListRouter);

//server conection------------------
let port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log('server side conected to port: ', port,'!<---------------------------------------')
}) 