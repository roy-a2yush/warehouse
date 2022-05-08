const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  productName: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  placeTag: {
    type: String,
    required: true
  },
  costPrice: {
    type: Number,
  },
  MRP: {
      type: Number,
  },
  estimatedSP: {
      type: Number,
  },
  productImage: {
      type: String,
  },
  productCount: {
      type: Number,
  },
  softDeleted: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Product', ProductSchema)