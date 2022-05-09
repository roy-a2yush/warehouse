//node modules
const express = require('express')
const fs = require('fs')

//files
const Product = require('../managers/product')
const isAuth = require('../helpers/isAuth')
const { json } = require('express/lib/response')

//cconfigure
const router = express.Router()

router.get('/dashboard', isAuth(), (req, res) => {
    res.render("dashboard.ejs", {page: 'Dashboard', organisationName: `${req.session.organisationName}`, firstName: `${req.session.firstName}`})
})

router.get('/', isAuth(), Product.all)

router.get('/add', isAuth(), (req, res) => {
    docs = ''
    res.render('addProduct.ejs', {page: 'Add Product', submitUrl: '/product/add', docs: docs, buttonName: 'Add Product', icon: 'icon-plus'})
})
router.post('/add', isAuth(), Product.add)

router.post('/remove', isAuth(), Product.remove)

router.get('/edit/:id', isAuth(), Product.findById)
router.post('/edit', isAuth(), Product.edit)

router.get('/find/:id', isAuth(), Product.findById)

router.get('/find', isAuth(), Product.all)
router.post('/find', isAuth(), Product.find)

module.exports = router