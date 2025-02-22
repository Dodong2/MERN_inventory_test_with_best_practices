const Product = require('../models/product')

//Get all Products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({ message: 'successfully get', products })
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

//Get product by ID
const getProductById = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

//Create Product
const createProduct = async (req, res) => {
    const { name, category, quantity, price, description } = req.body
    try {
        if(!name || !category || !quantity || !price || !description) {
            res.status(404).json({ message: 'All fields are required' })
        }

        const product = await Product.create({ name, category, quantity, price, description })
        res.status(200).json({ message: 'products created successfully!', product })
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
} 

//Update product
const updateProduct = async (req, res) => {
    const { name, category, quantity, price, description } = req.body
    const { id } = req.params
    try {
        const updateProduct = await Product.findByIdAndUpdate(id, {
            name,
            category,
            quantity,
            price,
            description
        }, { new: true })   

        if(!updateProduct) {
            res.status(404).json({ message: 'Product not found' })
        }

        res.status(200).json({ message: 'successfully updated', updateProduct })
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

//Delete product
const deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        const deleteProduct = await Product.findByIdAndDelete(id)
        res.status(200).json({ message: 'Deleted Successfully' })
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

// Purchase Product (Auto Compute Total & Deduct Stock)
const purchaseProduct = async (req, res) => {
    const { productId, quantity } = req.body
    
    try {
        const product = await Product.findById(productId)

        if(!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        if(!product.quantity < quantity) {
            return res.status(400).json({ message: 'Not enough stock available' })
        }

        const totalPrice = product.price * quantity

        product.quantity -= quantity

        await product.save()

        res.status(200).json({
            message: 'Purchase successful',
            productName: product.name,
            quantityPurchased: quantity,
            remainingStock: product.quantity,
            totalPrice
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    purchaseProduct
}