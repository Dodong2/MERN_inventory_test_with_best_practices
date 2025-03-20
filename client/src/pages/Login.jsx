import { useLogin } from '../hooks/login hooks/useLogin';
import ForgetPassModal from '../components/modals/ForgetPassModal'
import PropTypes from 'prop-types'

const Login = ({ onLogin }) => {
    const { email, setEmail, password, setPassword, error, setError, isModal, isLoading, handleLogin, handleSubmitPin, handleModalOpen, handleModalClose } = useLogin()

//para sa routes security
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const login = await handleLogin(e); // Tawagin ang handleLogin mula sa useLogin
          if (login?.success) {
              onLogin(); // Tawagin ang onLogin prop kapag successful ang login
          }
      } catch (error) {
          console.error("Error login:", error);
      }
  };
    
  return (
    <div>
        <form onSubmit={handleSubmit}>
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

Login.propTypes = {
  onLogin: PropTypes.func.isRequired, // onLogin dapat isang function at required
};

export default Login