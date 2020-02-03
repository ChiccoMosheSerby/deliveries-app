const express = require("express");
const router = express.Router();
const orderTodoCollection = require('../DB/Schema').orderTodoSchema


let accountSid = 'ACf863e7c1ec621cd0c1bc2a978d51a6f9'; // Your Account SID from www.twilio.com/console
let authToken = '26b3bece8b3b17ca4d714eb2cd97b149';   // Your Auth Token from www.twilio.com/console

let twilio = require('twilio');
let client = new twilio(accountSid, authToken);



function uniqid() {
    return Math.random().toString(16).slice(15) + (new Date()).getTime() + Math.random().toString(16).slice(15);
}

router.post('/', (req, res) => {
    console.log('message.sid')
    let newOrder = req.body;



    if (newOrder.selectedBranch &&
        newOrder.DeleiveryOrTakeAway &&
        newOrder.paymentType &&
        newOrder.orderTime &&
        newOrder.total) {
        newOrder.orderNum = uniqid();
        newOrder.status = 'new';

        //WhatsApp
        client.messages.create({
            from: 'whatsapp:+14155238886',
            body: 'מספר הזמנתך : ' + newOrder.orderNum + ' פרטי הזמנה כאן : https://deliveries-app-heroku.herokuapp.com',
            to: 'whatsapp:+972547738302'
            // + newOrder.clientPhoneNumber
            // to: 'whatsapp:+972547738302'
        }).then(message => console.log(message.sid));


        //Add order to DB
        orderTodoDoc = new orderTodoCollection(newOrder);
        orderTodoDoc.save().then(doc => {
            // console.log('added: ', doc)

            //get all orders to DB
            orderTodoCollection.find({status:"new"},(err, list) => {
                if (err) {
                    throw err;
                }
                else {
                    res.send({ list: list, track: newOrder.orderNum });
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
                user: 'chiccomosheserby@gmail.com',
                pass: 'chiccochicco123'
            }
        });
        let mailOptions = {
            from: 'some@tst.com',
            to: newOrder.clientEmail,
            subject: 'we recived your order from delivery app DEMO - ' + newOrder.selectedBranch,
            text: 'your order number for tracking: ' + newOrder.orderNum
        };
        let mailOptions2 = {
            from: 'some@tst.com',
            to: 'chiccomoshe@gmail.com',
            subject: 'new order - ' + newOrder.selectedBranch,
            text: 'order number: ' + newOrder.orderNum + '\n'
                + 'name : ' + newOrder.clientName + '\n'
                + 'phone number: ' + newOrder.clientPhoneNumber
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);

            } else {

                console.log('Email sent');
            }
        });
        transporter.sendMail(mailOptions2, function (error, info) {
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
