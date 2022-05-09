//node modules
const express = require('express')
const fs = require('fs')
const { json } = require('express/lib/response')

//files
const Product = require('../managers/product')
const isAuth = require('../helpers/isAuth')
const ProductModel = require('../models/Product')

//cconfigure
const router = express.Router()

router.get('/dashboard', isAuth(), (req, res) => {
    res.render("dashboard.ejs", {page: 'Dashboard', organisationName: `${req.session.organisationName}`, firstName: `${req.session.firstName}`})
})

router.get('/', isAuth(), Product.all)

router.get('/add', isAuth(), async (req, res) => {
    docs = ''
    const numProducts = await ProductModel.estimatedDocumentCount();
    res.render('addProduct.ejs', {page: 'Add Product', submitUrl: '/product/add', docs: docs, buttonName: 'Add Product', icon: 'icon-plus', numProducts: numProducts})
})
router.post('/add', isAuth(), Product.add)

router.post('/remove', isAuth(), Product.remove)

router.get('/edit/:id', isAuth(), Product.findById)
router.post('/edit/:id', isAuth(), Product.edit)

router.get('/find/:id', isAuth(), Product.findById)

router.get('/find', isAuth(), Product.all)
router.post('/find', isAuth(), Product.find)

module.exports = router