//node modules
const express = require('express')

//files
const Login = require('./login')
const Product = require('./product')

//cconfigure
const router = express.Router()

//routes
router.use('/', Login)
router.use('/login', Login)
router.use('/product', Product)

module.exports = router