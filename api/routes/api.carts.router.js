const express = require('express')
const router = express.Router()

const apiCartControllers = require('../controllers/api.carts.controller')


router.get('/', apiCartControllers.getCart)
router.get('/:id', apiCartControllers.getCartById)
router.post('/:id', apiCartControllers.postCart)
router.patch('/:bookId', apiCartControllers.updateCartById)
router.delete('/:id', apiCartControllers.deleteCartById)

module.exports = router