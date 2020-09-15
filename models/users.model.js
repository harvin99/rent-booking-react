const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    isAdmin: Boolean,
    wrongLoginCount: Number,
    avatarUrl: String,
    shopId : String
})
const User = mongoose.model('User', userSchema, 'users')

module.exports = User