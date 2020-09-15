const Book = require('../../models/books.model')
const User = require('../../models/users.model')

module.exports.getBook = async (req, res) => {
    try {
        const books = await Book.find()
        res.status(200).json({books : books})
    } catch (error) {
        console.log(error.message)  
        res.status(404).json({error : "Not found !"})
    }
}
module.exports.postCreateBook = (req, res) => {
    try {
        let book = new Book()

        book.title = req.body.title
        book.description = req.body.description
        book.image = "https://loremflickr.com/320/240"
        book.save()
        res.status(200).json({message : "Create book success !"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error : "Can not create book!"})
    }
}
module.exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        if(!book){
            res.status(500).json({error : "Book is not found !"})
            return
        }
        res.status(200).json({book : book})
    } catch (error) {
        console.log(error.message)
        res.status(404).json({error : "Not Found !"})
    }
}
module.exports.updateBookById = async (req, res) => {
    try {
        await Book.findByIdAndUpdate(req.params.id, 
            {
                title : req.body.title , 
                description : req.body.description,
                image : req.body.pathImage
            }
        )
        res.status(200).json({message : "Update Book Success !"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error : "Update Book Failed !"})
    }
}
module.exports.deleteBookById = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id)
        res.status(200).json({message : "Delete Book Success !"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error : "Delete Book Failed !"})
    }
}
module.exports.getSearchBook = async (req, res) => {
    try {
        const q = req.query.q
        let books = await Book.find({})
        let matchedBooks = books.filter(book => 
            book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1)
        res.status(200).json({
            books : matchedBooks
        })
    } catch (error) {
        console.log(error.message)
        res.status(404).json({error : "Not found !"})
    }
}
module.exports.postSearchBook = async (req, res) => {
    try {
        const q = req.query.q
        let books = await Book.find({})
        let matchedBooks = books.filter(book => 
            book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1)
        res.status(200).json({
            books : matchedBooks
        })
    } catch (error) {
        console.log(error.message)
        res.status(404).json({error : "Not found !"})
    }
}



