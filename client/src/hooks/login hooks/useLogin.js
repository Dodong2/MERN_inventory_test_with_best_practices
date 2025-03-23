import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginAuth } from "../../services/AuthApi";
import { forgetPassword } from "../../services/pin";
import { toast } from 'react-toastify'


export const useLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [isModal, setModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showpass, setshowpass] = useState(false)
    const [changeicon, setchangeicon] = useState(true)

//login
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const login = await LoginAuth(email, password)
            if(login.success) {
                navigate('/list')
                toast.success("successfully login", { position: 'top-right' })
                return {success: true}
            } else {
                setError("Your email or password is incorrect. Please try again.")
                return {success: false}
            }
        } catch(error) {
            console.error("Error login:", error)
            return {success: false}
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

//pang open ng modal
    const handleModalOpen = () => {
        setModal(true)
    }

//pang close ng modal
    const handleModalClose = () => {
        setModal(false)
    }

    //pang show ng pass
    const tgglePass = () => {
      setshowpass(!showpass)
    }

    //pang change ng icon para sa pass
    const tggleicons = () => {
      setchangeicon(!changeicon)
    }

    return { 
        email, 
        setEmail, 
        password, 
        setPassword, 
        error, 
        setError, 
        isModal, 
        isLoading, 
        handleLogin, 
        handleSubmitPin, 
        handleModalOpen, 
        handleModalClose, 
        tgglePass,
        tggleicons,
        showpass,
        changeicon
    }
}