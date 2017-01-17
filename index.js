'use strict'

const express = require('express')
const bodyParser = require('body-parser')

let app = express();

let port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port, () => {
  console.log(`API REST corriendo en http://localhost:${port}`)
})
