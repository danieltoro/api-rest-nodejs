'use strict'

const express = require('express');
const productController = require('../controllers/product')
const auth = require('../middlewares/auth');
const api = express.Router()

api.get('/product', productController.getProducts)
api.get('/product/:productId', productController.getProduct)
api.post('/product', productController.saveProduct)
api.put('/product/:productId', productController.updateProduct)
api.delete('/product/:productId', productController.deleteProduct)
api.get('/private', function(req, res){
  res.status(200).send({message: `Tienes acceso`})
})

module.exports = api
