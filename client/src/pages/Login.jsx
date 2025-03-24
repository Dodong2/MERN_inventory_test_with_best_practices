import { useLogin } from "../hooks/login hooks/useLogin";
import ForgetPassModal from "../components/modals/ForgetPassModal";
import PropTypes from "prop-types";
import Logo from "../assets/image/logo.svg";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = ({ onLogin }) => {
  const {
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
  } = useLogin();


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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

      <div className="relative bg-[#1A1A1A] p-8 flex justify-center w-full max-w-md rounded-t-2xl">
        <img src={Logo} className="w-32 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="w-full max-w-md bg-white rounded-b-2xl shadow-md p-8">

        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="email" value={email} onChange={(e) => {setEmail(e.target.value); setError(""); }}
            placeholder="Email"
            className="w-full p-2 border rounded-md focus:outline-sky-500"
            required/>

          <div className="relative">
          <input type={showpass ? 'text' : 'password'} value={password} onChange={(e) => {setPassword(e.target.value); setError(""); }}
            placeholder="password"
            className="w-full p-2 border rounded-md focus:outline-sky-500"
            required />
          <div
           className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
           onClick={tggleicons}>{changeicon ? (<FaEye onClick={tgglePass} />) : (<FaEyeSlash onClick={tgglePass} />)}</div>
          </div>

          {/* Error */}
          {error && <p className="text-red-500">{error}</p>}

          <button type="submit"
            className={`w-full bg-[#00AEEF] text-white p-2 rounded-md hover:bg-[#CF2945] active:scale-95 transition-transform duration-75`}>
            submit
          </button>

        </form><br />

        {/* forget password */}
        <p className="text-sm text-center">If you forgot your password,
          <span onClick={handleModalOpen} className="text-[#FB002A] hover:underline cursor-pointer"> click here</span> to reset it.</p>

        {/* forget pass modal */}
        <ForgetPassModal
          isOpen={isModal}
          onClose={handleModalClose}
          onPin={handleSubmitPin}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired, // onLogin dapat isang function at required
};

export default Login;
