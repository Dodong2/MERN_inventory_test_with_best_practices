require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const salesRoutes = require('./routes/salesRoutes')
const pinRoutes = require('./routes/pinRoutes')
const app = express()

app.use(express.json())

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

const PORT = process.env.PORT || 5000

connectDB()

app.use('/api/products', productRoutes)
app.use('/api/sales', salesRoutes)
app.use('/api/pin', pinRoutes)

app.listen(PORT, () => {
    console.log(`connected to the ${PORT}`)
})