const express = require('express')
const router = express.Router()
const { login, register, changePassword, forgetPassword } = require('../controller/authController')

router.post('/login', login)
router.post('/register', register)
router.post('/forget', forgetPassword)
router.post('/changepass', changePassword)

module.exports = router