const User = require('../../models/users.model')
const Book = require('../../models/books.model')
const Transaction = require('../../models/transactions.model')


module.exports.getTransaction = async (req, res) => {
    try {
        const user = await User.findById(req.signedCookies.userId)

        if(!user){
            res.status(500).json({error : "You need to login !"})
            return
        }
        else {
            var trans = await Transaction.find()
            
            if(trans){
                var items = trans
                var list = []
                if(user.isAdmin){
                    for(var tran of items){
                        let tempUser = await User.findById(tran.userId)
                        let tempBook = await Book.findById(tran.bookId)
                        let item = {
                            id : tran._id,
                            userName : tempUser.name,
                            bookTitle : tempBook.title,
                            isComplete : tran.isComplete
                        }
                        list.push(item)
                    }
                    res.status(200).json({trans : list})
                }
                else
                {
                    var tranUser = items.filter(item => item.userId === user.id)
                    if(tranUser.length > 0){
                        for(var tran of tranUser){
                        let tempUser = await User.findById(tran.userId)
                        let tempBook = await Book.findById(tran.bookId)
                        let item = {
                            id : tran._id,
                            userName : tempUser.name,
                            bookTitle : tempBook.title,
                            isComplete: tran.isComplete
                        }
                        list.push(item)
                        }
                        res.status(200).json({trans : list})
                    }
                    else{
                        res.status(200).json({trans : list})
                    }
                }       
            }
        }
    } catch (error) {
        console.log(error.message)
    }
}
module.exports.getCreateTransaction = async (req, res) => {
    try {
        var user = await User.findById(req.signedCookies.userId)
        if(!user){
            res.status(500).json({error : "You need to login !"})
            return
        }
        else {
            if(user.isAdmin){
                res.status(200).json({
                    users : await User.find(),
                    books : await Book.find()
                })
            }
            else{
                res.status(200).json({
                    user : user,
                    books : await Book.find()
                })
            }
        }
        
    } catch (error) {
        console.log(error.message)
    }
}
module.exports.postCreateTransaction = (req, res) => {
    if(!req.signedCookies.userId){
        res.status(500).json({error : "You need to login !"})
        return
    }
    else {
        let rent = new Transaction()
        rent.userId =  req.body.selectedname
        rent.bookId = req.body.selectedbook
        rent.isComplete = false
        rent.save(function(error){
        if(error){
            res.status(401).json({error : "Create failed !"})
            return console.error(error)
        }
        else
            res.status(200).json({message : "Created Success !"})
        })
    }
    
}
module.exports.getIdTransaction = async (req, res) => {
    try {
        if(!req.signedCookies.userId){
            res.status(500).json({error : "You need to login !"})
            return
        }
        else {
            const rent = await Transaction.findById(req.params.id )
            if(rent == null)
                res.status(500).json({error : "Not exist transaction !"})
            else
            {
                res.status(200).json({transaction : rent})
            }
        }
    } catch (error) {
        console.log(error.message)
    }
}
module.exports.updateTransactionById = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId)
        const book = await Book.findById(req.body.bookId)
        if(!user || !book){
            res.status(500).json({error : "User or Book is not found !"})
            return
        }
        await Transaction.findByIdAndUpdate(req.params.id , 
            {   
                userId : user._id,
                bookId : book._id,
                isComplete : true
            })
            res.status(200).json({message : "Update transaction success !"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error : "Update transaction failed !"})
    }
}
module.exports.deleteTransactionById = async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id)
        res.status(200).json({message : "Delete transaction success !"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error : "Delete transaction failed !"})
    }
}