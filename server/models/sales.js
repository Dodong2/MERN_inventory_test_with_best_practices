const mongoose = require('mongoose')

const saleSchema = mongoose.Schema({
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            productName: { type: String, required: true },
            quantity: { type: Number, required: true },
            totalPrice: { type: Number, required: true },        
        },
    ],
    totalAmount: { type: Number, required: true },
    customerName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true })

const Sales = mongoose.model('Sales', saleSchema)

module.exports = Sales