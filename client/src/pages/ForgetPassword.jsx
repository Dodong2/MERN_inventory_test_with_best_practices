import { useForget } from "../hooks/forget password hooks/useForget"
import Logo from "../assets/image/logo.svg";

const ForgetPassword = () => {
  const { handleSubmit, email, password, setPassword, setEmail, message } = useForget()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative bg-[#1A1A1A] p-8 flex justify-center w-full max-w-md rounded-t-2xl">
          <img src={Logo} className="w-32 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="w-full max-w-md bg-white rounded-b-2xl shadow-md p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* new password input */}
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="enter new password" 
        className="w-full p-2 border rounded-md focus:outline-sky-500" required />
        {/* email for confirmation */}
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="enter email for confirmation" 
        className="w-full p-2 border rounded-md focus:outline-sky-500" required /> 
        {/* message/error */}
        {message && <p>{message}</p>}
        <button type="submit"
        className={`w-full bg-[#00AEEF] text-white p-2 rounded-md hover:bg-[#CF2945] active:scale-95 transition-transform duration-75`}
        >Submit</button>
      </form> 
        
        </div>
    </div>
  )
}

export default ForgetPassword