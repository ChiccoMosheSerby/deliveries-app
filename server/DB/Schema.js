const mongoose = require('mongoose');//npm i mongoose

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

module.exports =
{
    orderTodoSchema: mongoose.model('orders', orderTodoSchema),
    branchesSchema: mongoose.model('branches', branchesSchema)
}