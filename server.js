require('dotenv').config()
const express = require("express")
const mongoose = require('mongoose')
//const cookieParser = require('cookie-parser')
const cors = require("cors")
//const bodyParser = require('body-parser')

const apiLoginRouter = require('./api/routes/api.login.router')
const apiTransactionsRouter = require('./api/routes/api.transactions.router')
const apiUsersRouter = require('./api/routes/api.users.router')
const apiBooksRouter = require('./api/routes/api.books.router')
const apiCartsRouter = require('./api/routes/api.carts.router')

// const booksRouter = require('./routes/books.router')
// const usersRouter = require('./routes/users.router')
// const authRouter = require('./routes/auth.router')
// const transactionsRouter = require('./routes/transactions.router')
// const cartRouter = require('./routes/cart.router')
// const registerRouter = require('./routes/register.router') 
// const shopsRouter = require('./routes/shops.router')

// const authMiddleware = require('./middlewares/auth.middleware')
// const sessionMiddleware = require('./middlewares/session.middleware')
//For DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify : false
})
//Connect mongoose 
mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected !!!')
})
const app = express()
//For body parser 
app.use(express.urlencoded({extended: false}))
app.use(express.json())
//For favicon
//app.use(express.static('public'))
//app.use(cookieParser(process.env.SESSION_KEY))
//For middleware
//app.use(sessionMiddleware)

//Set view engine template
//app.set('view engine', 'pug')
//app.set('views', './views')
//For API
app.use(cors())

app.use('/api/login', cors(),  apiLoginRouter)
app.use('/api/transactions', apiTransactionsRouter)
app.use('/api/users', cors(), apiUsersRouter)
app.use('/api/books', cors(),  apiBooksRouter)
app.use('/api/carts', cors(),  apiCartsRouter)

//Router
// app.get('/', (req,res) => {
//   res.render('index')
// })
// app.use('/books', booksRouter)
// app.use('/users', authMiddleware.requireAuth, usersRouter)
// app.use('/register', registerRouter)
// app.use('/auth', authRouter)
// app.use('/transactions', authMiddleware.requireAuth, transactionsRouter)
// app.use('/cart', cartRouter)
// app.use('/shops', shopsRouter)
//Error handling
// app.use((req, res, next) => {
//   res.status(404)
//   res.render('error', {
//     status : res.status (404),
//     message : "Page not found !"
//   })
// })
// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port)
})
