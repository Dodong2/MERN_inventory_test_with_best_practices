import { useState } from 'react'
import { LoginAuth } from '../services/AuthApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [error, setError] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const login = await LoginAuth(email, password)
            if(login.success) {
                navigate('/')
                toast.success("successfully login")
            } else {
                setError("email or password error")
            }
        } catch(error) {
            console.error("Error login:", error)
        }
    }
    
  return (
    <div>
        <form onSubmit={handleLogin}>
            <input type='email' value={email} onChange={(e) => {setEmail(e.target.value); setError("")}} required/>
            <input type='text' value={password} onChange={(e) => {setPassword(e.target.value); setError("")}} required/>
            <button type='submit'>submit</button>
            {error && <p>{error}</p>}
        </form>
    </div>
  )
}

export default Login