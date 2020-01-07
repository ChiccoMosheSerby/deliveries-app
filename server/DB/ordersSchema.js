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

module.exports = mongoose.model('orders', orderTodoSchema);