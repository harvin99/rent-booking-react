const Session = require('../../models/sessions.model')
const Book = require('../../models/books.model')
const Transaction = require('../../models/transactions.model')

module.exports.getCart = async (req, res) => {
    try {
        var session = await Session.find()
        res.status(200).json({listBook : session})
    } catch (error) {
        console.log(error.message)
        res.status(404).json({error : "Not found !"})
    }
}
module.exports.getCartById = async (req, res) => {
    try {
        var session = await Session.findById(req.params.id)
        if(!session){
            res.status(500).json({error : "Not found session by id"})
            return
        }
        var sumBook = 0
        var listBook = []
            for(bookId in session.cart){
                var book = await Book.findById(bookId)
                var bookData = {
                    id:book.id,
                    bookTitle: book.title,
                    cover: book.coverUrl ? book.coverUrl : book.image,
                    amount: session.cart[bookId]
                }
                listBook.push(bookData)
                sumBook += session.cart[bookId]
            }
        res.status(200).json({listBook : listBook, amount : sumBook})
    } catch (error) {
        console.log(error.message)
        res.status(404).json({error : "Not found !"})
    }
}
module.exports.postCart = async (req, res) => {
    try {
            const session = await Session.findById(req.params.id)
            if(!session){
                res.status(500).json({error : "Not found session by id"})
                return
            }
            if(!req.signedCookies.userId){
                res.status(500).json({error : "You need to login !"})
                return
            }
            for(bookId in session.cart){
                let rent = new Transaction()
                rent.userId = req.signedCookies.userId
                rent.bookId = bookId
                rent.amount = session.cart[bookId]
                rent.isComplete = false
                rent.save()
            }
            res.status(200).json({message : "Post cart success"})
    } catch (error) {
        console.log(error.message)
        res.status(404).json({error : "Not found !"})
    }
}
module.exports.updateCartById = async (req, res) => {
    try {
        await Session.findByIdAndUpdate(req.signedCookies.sessionId, {
            $inc : {
                ['cart.' + req.params.bookId] : req.body.amount
            }
        })
    } catch (error) {
        console.log(error.message)
        res.status(404).json({error : "Update cart failed !"})
    }
}
module.exports.deleteCartById = async(req, res) => {
    try {
        await Session.findByIdAndDelete(req.params.id)
        res.status(200).json({message : "Delete cart success !"})
    } catch (error) {
        console.log(error.message)
        res.status(404).json({error : "Delete cart failed !"})
    }
}