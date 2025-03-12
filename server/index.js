require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const salesRoutes = require('./routes/salesRoutes')
const pinRoutes = require('./routes/pinRoutes')
const stockRecordRoutes = require('./routes/stockRecordRoutes')
const authRoutes = require('./routes/authRoutes')
const app = express()

app.use(express.json())

app.use(cors({
    origin: 'https://testinventory.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

const PORT = process.env.PORT || 5000

connectDB()

app.use('/api/products', productRoutes)
app.use('/api/sales', salesRoutes)
app.use('/api/pin', pinRoutes)
app.use('/api/stock', stockRecordRoutes)
app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`connected to the ${PORT}`)
})