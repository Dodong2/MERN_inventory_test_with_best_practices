require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const app = express()

app.use(express.json())

app.use(cors())

const PORT = process.env.PORT || 5000

connectDB()

app.listen(PORT, () => {
    console.log(`connected to the ${PORT}`)
})