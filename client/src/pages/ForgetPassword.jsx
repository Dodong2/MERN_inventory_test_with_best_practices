import { useForget } from "../hooks/forget password hooks/useForget"

const ForgetPassword = () => {
  const { handleSubmit, email, password, setPassword, setEmail, message } = useForget()

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="enter email for confirmation" required /> 
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="enter new password" required />
        <button type="submit">Submit</button>
      </form> 
        {message && <p>{message}</p>}
    </div>
  )
}

export default ForgetPassword