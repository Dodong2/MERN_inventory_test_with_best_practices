import { useState } from "react"
import { changePass } from "../../services/ChangePassword"

export const useForget = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
    
        if(!email || !password) {
          setMessage("Email and password are required")
          return
        }
    
        try {
          const response = await changePass(email, password)
          setMessage(response.message)
        } catch(error) {
          console.error(error)
          setMessage("Error changing password")
        }
      }
    return { email, setEmail, password, setPassword, handleSubmit, message }
}
