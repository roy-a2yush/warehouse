var fs = require('fs');
const mongoose = require('mongoose')

const Product = require('../models/Product')
const User = require('../models/Product')

let productDetails
function findProduct(productName) {
    return new Promise(async (resolve, reject) => {
        const result = await Product.find({ productName: productName }, function (err, docs) {
            if (err) {
                res.status(500).send(err)
                reject(err)
            }
            else {
                productDetails = docs
                resolve()
            }
        })
    })
}

//------------------------------------ALL PRODUCTS
exports.all = async (req, res, next) => {
    Product.find({}, function (err, docs) {
        if (err) {
            res.status(500).send(err)
        }
        else {
            console.log(docs)
            if (docs.length == 0) {
                res.status(404).send("Not found, please choose from drop down")
            } else {
                if (req.url == '/') {
                    res.status(200).render('listProducts.ejs', {productDetails: docs, page: 'Products List'})
                } else if(req.url == '/find') {
                    res.status(200).render('findProduct.ejs', {productDetails: docs, page: 'Find Details'})
                }
            }
        }
    })
}

//------------------------------------ADD PRODUCT
exports.add = async (req, res, next) => {
    productId = req.body.productId
    productName = req.body.productName
    placeTag = req.body.placeTag
    costPrice = req.body.costPrice
    mrp = req.body.mrp
    estimatedSP = req.body.estimatedSP
    productImage = req.body.productImage
    productCount = req.body.productCount
    perQuantity = req.body.perQuantity
    brand = req.body.brand

    var errors = new Array()

    if (productId == '') {
        errors.push("Product Id is mandatory")
    }
    if (productName == '') {
        errors.push("Product Name is mandatory")
    }
    if (placeTag == '') {
        errors.push("Place Tag is mandatory")
    }

    product = {
        productId: productId,
        productName: productName,
        placeTag: placeTag,
        costPrice: costPrice,
        MRP: mrp,
        estimatedSP: estimatedSP,
        productImage: productImage,
        productCount: productCount,
        perQuantity: perQuantity,
        brand: brand
    }

    let newProduct = new Product(product)

    try {
        const a1 = await newProduct.save()
        res.status(200).render('successful.ejs', {firstName: `${req.session.firstName}`, customButtonName: 'Add another Product', customButtonPath: '/product/add', page: 'Success!'})
    } catch (err) {
        res.status(400).render('failurePage.ejs', {firstName: `${req.session.firstName}`, customButtonName: 'Add another Product', customButtonPath: '/product/add', page: 'Failed!'})
    }
}

//------------------------------------REMOVE PRODUCT
exports.remove = async (req, res, next) => {
    Product.deleteOne({
        productName: req.body.productName
    }, (err) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).send("Deleted")
        }
    })
}

//------------------------------------EDIT PRODUCT
exports.edit = async (req, res, next) => {
    productId = req.body.productId
    productName = req.body.productName
    placeTag = req.body.placeTag
    costPrice = req.body.costPrice
    mrp = req.body.mrp
    estimatedSP = req.body.estimatedSP
    productImage = req.body.productImage
    productCount = req.body.productCount 
    p = findProduct(req.body.productName).then( async () => {
        productDetails.productId = productId
        productDetails.productName = productName
        productDetails.placeTag = placeTag
        productDetails.costPrice = costPrice
        productDetails.mrp = mrp
        productDetails.estimatedSP = estimatedSP
        productDetails.productImage = productImage
        productDetails.productCount= productCount
        try {
            productDetails.save()
            res.status(200).send(productDetails)
        } catch (err) {
            res.status(400).send(err)
        }
    })
}

//------------------------------------FIND PRODUCT
exports.find = async (req, res, next) => {
    Product.find({ productName: req.body.productName }, function (err, docs) {
        if (err) {
            res.status(500).send(err)
        }
        else {
            // console.log(docs)
            if (docs.length == 0) {
                res.status(404).send("Not found, please choose from drop down")
            } else if (docs.length > 1) {
                res.status(200).render('listProducts.ejs', {productDetails: docs, page: 'Product Details'})
            } else {
                res.status(200).render('productDisplay.ejs', {docs: docs[0], page: 'Product Details'})
            }
        }
    })
}



//------------------------------------FIND PRODUCT BY ID
exports.findById = async (req, res, next) => {
    mongooseId = mongoose.Types.ObjectId(req.params.id)
    Product.findById(mongooseId, (err, docs) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            if (!docs) {
                res.status(404).send("Not found, please choose from drop down")
            } else {
                res.status(200).render('productDisplay.ejs', {docs: docs, page: 'Product Details'})
            }
        }
    })
}