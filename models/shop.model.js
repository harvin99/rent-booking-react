const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: String, 
    description: String,
    image: String,
    coverUrl: String
})

const shopSchema = new mongoose.Schema({
    nameShop : String,
    userId : String,
    books : [bookSchema]
})
const Shop = mongoose.model('Shop', shopSchema, 'shops')

module.exports = Shop

