const express = require('express')
const router = express.Router()
const { getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct, 
    purchaseProduct} = require('../controller/productController')

//Define routes
router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.post('/purchase', purchaseProduct)

module.exports = router
