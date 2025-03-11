/* react notif lib */
import { useState } from "react"
import PropTypes from "prop-types"

const PinModal = ({ isOpen, onClose, onPinSubmit, isLoading }) => {
    const [pin, setPin] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onPinSubmit(pin) // Ipapasa ang PIN sa parent component
        setPin('') // I-reset ang input field
    }

    if (!isOpen) return null;
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

// Define PropTypes
PinModal.propTypes = {
    isOpen: PropTypes.bool.isRequired, // `isOpen` dapat boolean at required
    isLoading: PropTypes.bool.isRequired, // `isOpen` dapat boolean at required
    onClose: PropTypes.func.isRequired, // `onClose` dapat function at required
    onPinSubmit: PropTypes.func.isRequired, // `onPinSubmit` dapat function at required
  };

export default PinModal