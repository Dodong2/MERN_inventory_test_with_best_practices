const express = require('express')
const { getStockRecords } = require('../controller/productController')
const router = express.Router()

router.get('/:id', getStockRecords)

module.exports = router