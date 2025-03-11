import { useState } from "react"
import { changePass } from "../services/ChangePassword"


const ForgetPassword = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState("")

 
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /> 
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Submit</button>
      </form> 
        {message && <p>{message}</p>}
    </div>
  )
}

export default ForgetPassword