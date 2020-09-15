const express = require('express')
const apiTransactionsController = require('../controllers/api.transactions.controller')

const router = express.Router()

router.get('/', apiTransactionsController.getTransaction)
router.get('/create', apiTransactionsController.getCreateTransaction)
router.post('/create', apiTransactionsController.postCreateTransaction)
router.get('/:id', apiTransactionsController.getIdTransaction)
router.patch('/:id/update', apiTransactionsController.updateTransactionById)
router.delete('/:id/delete', apiTransactionsController.deleteTransactionById)
module.exports = router