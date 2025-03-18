const express = require('express')
const router = express.Router()
const { getTodaySales, getMonthlySales, getSalesHistory, deleteSales, getAllCustomers, getRecentSoldProducts, getLastMonthSales } = require('./../controller/salesController')

router.get('/today', getTodaySales)
router.get('/month', getMonthlySales)
router.get('/history', getSalesHistory)
router.delete('/delete', deleteSales)
router.get('/customers', getAllCustomers)
router.get('/recent', getRecentSoldProducts)
router.get('/lastmonth', getLastMonthSales)

module.exports = router