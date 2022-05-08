var fs = require('fs');

const Product = require('../models/Product')
const User = require('../models/Product')

let productDetails
function findProduct(productName) {
    return new Promise(async (resolve, reject) => {
        console.log("Hii")
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
        fs.readFile('db.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
                try {
            obj = JSON.parse(data); //now it an object
                } catch (e) {
                    var obj = {};
                }
            obj[a1.productName] = a1._id; //add some data
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFile('db.json', json, 'utf8', (e) => {
                console.log(e)
            }); // write it back 
        }});
        res.status(200).send(a1)
    } catch (err) {
        res.status(400).send(err)
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
            console.log(docs)
            res.status(200).render('productDisplay.ejs', {docs: docs[0], page: 'Product List'})
        }
    })
}