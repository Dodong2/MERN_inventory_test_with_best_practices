import { useLogin } from '../hooks/login hooks/useLogin';
import ForgetPassModal from '../components/modals/ForgetPassModal'

const Login = () => {
    const { email, setEmail, password, setPassword, error, setError, isModal, isLoading, handleLogin, handleSubmitPin, handleModalOpen, handleModalClose } = useLogin()

    
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