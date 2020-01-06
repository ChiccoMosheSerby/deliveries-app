const branches = require('../DB/branches.js');
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');//npm i mongoose


//Define a schema
const Schema = mongoose.Schema;
const branchesSchema = new Schema({
    branchId: String,
    branchPhoneNum: String,
    branchCity: String,
    branchStreet: String,
    branchStreetNum: String,
    openHour: String,
    closeHour: String,
    openHourWeekend: String,
    closeHourWeekend: String
});

const branchesCollection = mongoose.model('branches', branchesSchema);

router.post('/', (req, res) => {
    //Add order to DB
    // let branch = {
    //     branchId: '1',
    //     branchPhoneNum: '0585989898',
    //     branchCity: 'נתניה',
    //     branchStreet: 'הרצל',
    //     branchStreetNum: '48',
    //     openHour: '14:00',
    //     closeHour: '02:00',
    //     openHourWeekend: '11:00',
    //     closeHourWeekend: '02:00'
    // }
    // let branch2 =

    // {
    //     branchId: '2',
    //     branchPhoneNum: '0545658525',
    //     branchCity: 'חדרה',
    //     branchStreet: 'ארבע ארצות',
    //     branchStreetNum: '120',
    //     openHour: '14:00',
    //     closeHour: '02:00',
    //     openHourWeekend: '',
    //     closeHourWeekend: ''
    // }
    // let branch3 =

    // {
    //     branchId: '3',
    //     branchPhoneNum: '0582659865',
    //     branchCity: 'הרצליה',
    //     branchStreet: 'הרצל',
    //     branchStreetNum: '7',
    //     openHour: '14:00',
    //     closeHour: '02:00',
    //     openHourWeekend: '11:00',
    //     closeHourWeekend: '02:00'
    // }
    // let branch4 =
    // {
    //     branchId: '4',
    //     branchPhoneNum: '0584878787',
    //     branchCity: 'ת"א',
    //     branchStreet: 'ויצמן',
    //     branchStreetNum: '22',
    //     openHour: '14:00',
    //     closeHour: '02:00',
    //     openHourWeekend: '11:00',
    //     closeHourWeekend: '02:00'
    // }
    // branchesDoc = new branchesCollection(branch);
    // branchesDoc.save().then(doc => {
    //     console.log('added: ', doc)
    // })
    // branchesDoc = new branchesCollection(branch2);
    // branchesDoc.save().then(doc => {
    //     console.log('added: ', doc)
    // })
    // branchesDoc = new branchesCollection(branch3);
    // branchesDoc.save().then(doc => {
    //     console.log('added: ', doc)
    // })
    // branchesDoc = new branchesCollection(branch4);
    // branchesDoc.save().then(doc => {
    //     console.log('added: ', doc)
    // })
    // get all branches to DB
    branchesCollection.find((err, docs) => {
        if (err) {
            throw err;
        }
        else {
            console.log('found', docs)
            // Contacts = docs;
           
        }
    }).then(t=>{
        res.send(t);
    })


    res.send({ branches })
})

module.exports = router;
