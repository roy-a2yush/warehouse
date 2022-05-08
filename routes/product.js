//node modules
const express = require('express')
const fs = require('fs')

//files
const Product = require('../managers/product')
const isAuth = require('../helpers/isAuth')
const { json } = require('express/lib/response')

//cconfigure
const router = express.Router()


router.post('/', isAuth(), Product.all)

router.get('/add', isAuth(), (req, res) => {
    res.render('addProduct.ejs', {page: 'Add Product'})
})
router.post('/add', isAuth(), Product.add)

router.post('/remove', isAuth(), Product.remove)

router.post('/edit', isAuth(), Product.edit)

router.get('/find', isAuth(), (req, res) => {
    var a =[];
    a = fs.readFile('db.json', 'utf8', function(err, data){
        data = JSON.parse(data)
        // Display the file content
        a = Object.keys(data)
        for(var i=0;i<a.length;i++) {
            a[i] = decodeURI(a[i])
        }
        res.render('findProduct.ejs', {page: 'Find Product', products: a})
    });
})
router.post('/find', isAuth(), Product.find)

module.exports = router