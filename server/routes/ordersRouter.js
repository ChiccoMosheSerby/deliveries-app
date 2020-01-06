const express = require("express");
const router = express.Router();

const mongoose = require('mongoose');//npm i mongoose


function uniqid() {
    return Math.random().toString(16).slice(2) + (new Date()).getTime() + Math.random().toString(16).slice(2);
}
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

router.post('/', (req, res) => {

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
            console.log('added: ', doc)

            //get all orders to DB
            orderTodoCollection.find((err, list) => {
                if (err) {
                    throw err;
                }
                else {
                 res.send({ list: list, track: newOrder.orderNum});
                }
            })
        })

          //---------------  email  ------------------//
        ////npm install nodemailer
        //'generate pass from here: https://myaccount.google.com/apppasswords'
        const nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            type: "SMTP",
            host: "smtp.gmail.com",
            secure: true,
            auth: {
                user: 'chiccomoshe@gmail.com',
                pass: 'mhmbstqolssvnrtm'
            }
        });
        let mailOptions = {
            from: 'some@tst.com',
            to: 'chiccomoshe@gmail.com',
            subject: 'new order for branch: ' + newOrder.selectedBranch,
            text: 'new order: ' + newOrder.orderNum
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);

            } else {

                console.log('Email sent');
            }
        });
        //--------------- END - email ------------------//

    }


})

//update single order status

module.exports = router;
