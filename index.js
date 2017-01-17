'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

let app = express()

let port = process.env.PORT || 3000;

let Product = require('./models/product')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/product', (req, res) => {

  Product.find({}, (err, products) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!products) return res.status(404).send({message: `No existen productos`})

    res.status(200).send({products})
  })

})


app.get('/api/product/:productId', (req, res) => {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if (!product) return res.status(404).send({message: `El producto no existe`})

    res.status(200).send({product})
  })
})


app.post('/api/product', (req, res) => {
  console.log('POST /api/product')
  console.log(req.body)

  let product = new Product ()

  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description= req.body.description

  product.save((err, productStored) => {
    if (err) res.status(500).send({message: `error al guardar en la base de datos: ${err}`})

    res.status(200).send({product: productStored})
  })
})


app.put('/api/product/:productId', (req, res) => {
  let productId = req.params.productId
  let update = req.body

  Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
    if(err) res.status(500).send({message: `Error al actualizar el producto: ${err}`})

    res.status(200).send({product: productUpdated})
  })
})


app.delete('/api/product/:productId', (req, res) => {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if(err) res.status(500).send({message: `Error al borrar producto: ${err}`})

    product.remove(err => {
      res.status(200).send({message: `el producto ha sido eliminado`})
    })
  })
})


mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
  if(err) {
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }
  console.log('Conexion a la base de datos establecida...')

  app.listen(port, () => {
    console.log(`API REST corriendo en http://localhost:${port}`)
  })
})
