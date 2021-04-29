const router = require('express').Router()
const routesUser = require('./user')

router.use('/',routesUser)

module.exports = router