import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from 'framer-motion';

const ForgetPassModal = ({ isOpen, onClose, onPin, isLoading }) => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]; // Tamang paraan

  const handleChange = (index, value) => {
    if (!isNaN(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      if (value && index < 3) inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPin(pin.join(""));
    setPin(["", "", "", ""]);
  };

  useEffect(() => {
    if (isOpen) inputRefs[0].current.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80  flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className="bg-red-500 p-6 rounded-xl shadow-2xl border-2 border-white/20" // Tanggalin ang opacity-100 dito kung kinakailangan
      >
      <h2 className="text-lg font-semibold mb-4 text-white">PIN</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center">
            {pin.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                maxLength={1}
                className="w-10 h-10 text-center rounded-md mx-2 focus:ring-2 focus:ring-white focus:outline-none text-white font-bold bg-white/20 border-2 border-white/30"
              />
            ))}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            {isLoading ? "Validating..." : "Enter"}
            </button>
          <button onClick={onClose} className="text-xs text-white/80 mt-1 hover:underline">Close</button>
        </form>
        </motion.div>
    </div>
  );
};

ForgetPassModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onPin: PropTypes.func.isRequired,
};

export default ForgetPassModal;