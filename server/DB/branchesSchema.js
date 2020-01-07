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

module.exports = mongoose.model('branches', branchesSchema);


