const express = require('express')
const router = express.Router()
const { getTodaySales, getMonthlySales, getSalesHistory, deleteSales } = require('./../controller/salesController')

router.get('/today', getTodaySales)
router.get('/month', getMonthlySales)
router.get('/history', getSalesHistory)
router.delete('/delete', deleteSales)

module.exports = router