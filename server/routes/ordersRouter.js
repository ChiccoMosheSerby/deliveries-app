const express = require("express");
const router = express.Router();
const orderTodoCollection = require('../DB/ordersSchema')

function uniqid() {
    return Math.random().toString(16).slice(2) + (new Date()).getTime() + Math.random().toString(16).slice(2);
}

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
            // to: 'chiccomoshe@gmail.com',
            to:newOrder.clientEmail,
            subject: 'we recived your order from vegan food - ' + newOrder.selectedBranch,
            text: 'your order number for tracking: ' + newOrder.orderNum
        };
        let mailOptions2 = {
            from: 'some@tst.com',
            to: 'chiccomoshe@gmail.com',
            // to:newOrder.clientEmail,
            subject: 'new order - ' + newOrder.selectedBranch,
            text: 'order number: ' + newOrder.orderNum
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
