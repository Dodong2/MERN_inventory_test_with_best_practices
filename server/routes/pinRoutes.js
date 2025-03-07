const express = require('express')
const router = express.Router()
const { updatePin } = require('../controller/updatePINController')

router.post('/pin', updatePin)

module.exports = router