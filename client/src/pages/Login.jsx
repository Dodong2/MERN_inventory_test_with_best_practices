/* react lib */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
/* services */
import { LoginAuth } from '../services/AuthApi'
import { forgetPassword } from '../services/pin'
/* react notif lib */
import { toast } from 'react-toastify'
/* components */
import ForgetPassModal from '../components/modals/ForgetPassModal'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [isModal, setModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const login = await LoginAuth(email, password)
            if(login.success) {
                navigate('/')
                toast.success("successfully login", { position: 'top-right' })
            } else {
                setError("email or password error")
            }
        } catch(error) {
            console.error("Error login:", error)
        }
    }

    //pang handle ng pin
    const handleSubmitPin = async(pin) => {
        setIsLoading(true)
        const validPin = await forgetPassword(pin)
        if(validPin.success) {
            navigate('/forget')
        } else {
            toast.error("Invalid PIN. Please try again.", { position: 'top-right' })
        }
        setIsLoading(false)
    }

    const handleModalOpen = () => {
        setModal(true)
    }

    const handleModalClose = () => {
        setModal(false)
    }
    
  return (
    <div>
        <form onSubmit={handleLogin}>
            <input type='email' value={email} onChange={(e) => {setEmail(e.target.value); setError('')}} placeholder='Email' required/>
            <input type='text' value={password} onChange={(e) => {setPassword(e.target.value); setError('')}} placeholder='password' required/>
            <button type='submit'>submit</button>
            {error && <p>{error}</p>}
        </form>
        <button onClick={handleModalOpen}>forget Password</button>

        <ForgetPassModal isOpen={isModal} onClose={handleModalClose} onPin={handleSubmitPin} isLoading={isLoading} />
    </div>
  )
}

export default Login