const mongoose = require('mongoose')

const transacstionSchema = new mongoose.Schema({
    userId : String,
    bookId : String,
    amount : Number,
    isComplete: Boolean
})
const Transaction = mongoose.model('Transaction', transacstionSchema, 'rents')

module.exports = Transaction