import { useState } from "react"
import { changePass } from "../../services/ChangePassword"
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"

export const useForget = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()


    const handleSubmit = async(e) => {
        e.preventDefault()
    
        if(!email || !password) {
          setMessage("Email and password are required")
          return
        }
    
        try {
            const response = await changePass(email, password)
            if(!response.success) {
              toast.error('invalid email')
            } else {
            setMessage(response.message)
            toast.success("Change password successfuly")
            navigate('/')
            }
        } catch(error) {
          console.error(error)
          setMessage("Error changing password")
        }
      }
    return { email, setEmail, password, setPassword, handleSubmit, message }
}
