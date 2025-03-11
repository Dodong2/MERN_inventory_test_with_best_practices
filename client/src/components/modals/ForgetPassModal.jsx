/* react lib */
import { useState } from "react"
import PropTypes from "prop-types"

const ForgetPassModal = ({ isOpen, onClose, onPin, isLoading }) => {
    const [pin, setPin] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onPin(pin)
        setPin('')
    }

    if(!isOpen) return null
    
  return (
        <div className="overlay">
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} maxLength={4} placeholder="Enter PIN"/>
                <button type="submit">{isLoading ? 'Validating...' : 'Enter'}</button>
                <button onClick={onClose}>Close</button>
            </form>
        </div>
    </div>
  )
}

ForgetPassModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onPin: PropTypes.func.isRequired,
}

export default ForgetPassModal