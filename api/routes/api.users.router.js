const express = require('express')
var multer  = require('multer')

const router = express.Router()

var upload = multer({ dest: './public/uploads/' })

const apiUserControllers = require('../../api/controllers/api.users.controller')
// const apiUserValidate = require('../validate/users.validate')

// const authMiddleware = require('../middlewares/auth.middleware')

router.get('/', apiUserControllers.getUser)
router.post('/create_user', apiUserControllers.postCreateUser)
// router.get('/profile', apiUserControllers.getProfileUser)
// router.get('/profile/avatar', apiUserControllers.getUpdateAvatar)
// router.post('/profile/avatar', upload.single('avatar'), apiUserControllers.postUpdateAvatar)
router.get('/:id', apiUserControllers.getUserById)
router.patch('/:id/update', apiUserControllers.updateUserById)
router.delete('/:id/delete', apiUserControllers.getUserIdToDelete)

module.exports = router