const mongoose = require('mongoose')

const stockRecordSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantityAdded: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('StockRecord', stockRecordSchema)