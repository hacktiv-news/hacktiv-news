const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.get('/registrasi',UserController.regis)
router.get('/login',UserController.login)

module.exports = router