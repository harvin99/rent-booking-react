const express = require('express')
const apiLoginController = require('../controllers/api.login.controller')

const router = express.Router()

router.post('/', apiLoginController.postLogin)


module.exports = router