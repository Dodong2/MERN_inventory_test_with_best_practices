const Product = require('../models/product')
const Sales = require('../models/sales')
const StockRecord = require('../models/stockRecord')

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
        const product = await Product.findById(id)

        if(!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        // Calculate the difference in quantity
        const quantityAdded = quantity - product.quantity

        const updateProduct = await Product.findByIdAndUpdate(id, {
            name, category, quantity, price, description }, 
            { new: true })

        if(!updateProduct) {
            res.status(404).json({ message: 'Product not found' })
        }

        if(quantityAdded > 0) {
            await StockRecord.create({
                productId: id,
                quantityAdded,
            })
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
    const { cart, customerName } = req.body

    try {
        let totalAmount = 0;
        const purchaseProducts = []
        
        //Process each product in the cart
        for (const item of cart) {
            const product = await Product.findById(item._id)

            if(!product) {
                return res.status(404).json({ message: `Product not found: ${item._id}` })
            }

            if(product.quantity < item.quantity) {
                return res.status(400).json({ message: `Not enough stock available for ${product.name}` })
            }

             // Calculate total price for the item
            const totalPrice = product.price * item.quantity
            totalAmount += totalPrice

            // Deduct stock
            product.quantity -= item.quantity
            await product.save()

            // Add to purchased products
            purchaseProducts.push({
                productId: product._id,
                productName: product.name,
                quantity: item.quantity,
                totalPrice,
            })
        }

        // Save the sales record
        const salesRecord = await Sales.create({
            products: purchaseProducts,
            totalAmount,
            customerName
        })

        res.status(200).json({
            message: 'Purchase successful',
            salesRecord,
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

// Get stock records for a product
const getStockRecords = async (req, res) => {
    const { id } = req.params

    try {
        const stockRecords = await StockRecord.find({ productId: id }).sort({ timestamp: -1 })
        res.status(200).json(stockRecords)
    } catch (err) {
        console.log(err)
        res.status(500),json({ message: 'Server error' })
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    purchaseProduct,
    getStockRecords
}