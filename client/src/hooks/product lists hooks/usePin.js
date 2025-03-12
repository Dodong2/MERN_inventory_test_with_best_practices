import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgetPassword } from "../../services/pin";

export const usePin = () => {
    const [isPinModalOpen, setIsPinModalOpen] = useState(false)
    const [selectedProductId, setSelectedProductId] = useState(null); // Track selected product ID
    const [isLoading, setIsLoading] = useState(false)
    const [action, setAction] = useState(null)
    const navigate = useNavigate()

    // para sa PIN Submit
    const handlePinSubmit = async (pin) => {
        setIsLoading(true)
        try {
            const isValid = await forgetPassword(pin) // Call the backend API to validate PIN
            if(isValid.success) {
                if(action === 'update') {
                   navigate(`/product/update/${selectedProductId}`) // Redirect to update page
                } else if (action === 'add') {
                    navigate('/add')
                }    
            } else {
                toast.error('Invalid PIN. Please try again.', { position: 'top-right' })
            }
        } catch (error) {
            console.error('Error validating PIN:', error)
            toast.error('An error occurred. Please try again.', { position: 'top-right' });
        } finally {
            setIsLoading(false)
        }
    }

    // para sa pag open ng PIN modal sa update
    const handleUpdateClick = (productId) => {
        setSelectedProductId(productId)
        setAction('update')
        setIsPinModalOpen(true)
    }

    // para sa pag open ng PIN modal sa add
    const handleAddClick = () => {
        setAction('add')
        setIsPinModalOpen(true)
    }

    return { isPinModalOpen, isLoading, handlePinSubmit, handleAddClick, handleUpdateClick, setIsPinModalOpen, setAction }

}