const express = require('express')
const router = express.Router()
const { getTodaySales, getMonthlySales, getSalesHistory, deleteSales, getAllCustomers, getRecentSoldProducts, getLastMonthSales, getRecentCutomerName, getTopSalesPeryear } = require('./../controller/salesController')

router.get('/today', getTodaySales)
router.get('/month', getMonthlySales)
router.get('/history', getSalesHistory)
router.delete('/delete', deleteSales)
router.get('/customers', getAllCustomers)
router.get('/recent', getRecentSoldProducts)
router.get('/lastmonth', getLastMonthSales)
router.get('/recentcustomer', getRecentCutomerName)
router.get('/topsales', getTopSalesPeryear)

module.exports = router