const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// let accountSid = 'ACf863e7c1ec621cd0c1bc2a978d51a6f9'; // Your Account SID from www.twilio.com/console
// let authToken = '26b3bece8b3b17ca4d714eb2cd97b149';   // Your Auth Token from www.twilio.com/console

// let twilio = require('twilio');
// let client = new twilio(accountSid, authToken);

// client.messages.create({
//     body: 'Hello new Order',
//     to: '972585313233',  // Text this number
//     from: '+17176392486' // From a valid Twilio number
// })
// .then((message) => console.log(message.sid));


//ROUTERS/////////////////////////////////////////////////////////////////////////////

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

//END ROUTERS/////////////////////////////////////////////////////////////////////////////


//conections ////////////////////////////////////////////////////////////////////////////////////////////
//server conection------------------
let port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log('-------------------------> server conected to port: ', port, '!<---------------------------------------------------------')
})

//connect mongoDB---------------------------------------------------------------
const mongoose = require('mongoose');//npm i mongoose
const url = "mongodb://chicco:qqwwee123@cluster0-shard-00-00-hn1ba.mongodb.net:27017,cluster0-shard-00-01-hn1ba.mongodb.net:27017,cluster0-shard-00-02-hn1ba.mongodb.net:27017/TST?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('------------------------------> DB conected as well! <---------------------');
});
////////// END conections /////////////////////////////////////////////////////////////////////////////
