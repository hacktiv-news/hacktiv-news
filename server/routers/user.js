const router = require('express').Router()
const UserController = require('../controllers/UserController')
    
router.post('/registrasi', UserController.regis)
router.post('/login',UserController.login)

module.exports = router