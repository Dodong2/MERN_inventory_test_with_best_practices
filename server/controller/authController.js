const User = require('../models/user')
const bcrypt = require('bcrypt')

// login
    const login = async (req, res) => {
        const {email, password} = req.body
        
        try {
            const user = await User.findOne({ email })
            if(!user) {
               return res.status(404).json({ message: 'user not found' })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) {
                return res.status(401).json({ message: 'Invalid password' })
            }

            res.status(200).json({ success: true , message: 'successfuly login'})

        } catch (err) {
            console.error(err)
            res.status(500).json({ message: 'Server error' })
        }
    }

// register
    const register = async(req, res) => {
        const { email, password, pin } = req.body
        try {
            const hashedPass = await bcrypt.hash(password, 10)

            const newUser = new User ({ email, password: hashedPass, pin })
            await newUser.save()
            res.status(200).json({ message: 'User registered successfully'})

        } catch(err) {
            console.error(err)
            res.status(500).json({ message: "Server Invalid" })
        }
    }

// forget password
    const forgetPassword = async (req, res) => {
        const { pin } = req.body
        
        try {
            
            if(!pin) {
                return res.status(400). json({ success: false, message: 'Invalid PIN' })                    
            }
            const user = await User.findOne({ pin: pin })
            
            if(!user) {
                return res.status(400). json({ success: false, message: 'Invalid PIN' })
            }

            res.status(200).json({ success: true, message: 'PIN validated'})
            
        } catch(err) {
            console.error(err)
            res.status(500).json({ message: 'Server error' })
        }
    } 

// change password
    const changePassword = async (req, res) => {
        const { email, password } = req.body

        try {
            const user = await User.findOne({ email })
            if(!user) {
                res.status(404).json({ message: 'User not found' })
            }

            const hashedPass = await bcrypt.hash(newPassword, 10)
            user.password = hashedPass
            await user.save()

            res.status(200).json({ message: 'password changed successfully ' })
        } catch(err) {
            console.error(err)
            res.status(500).json({ message: 'Server error' })
        }
    }
    
module.exports = { login, register, forgetPassword, changePassword }