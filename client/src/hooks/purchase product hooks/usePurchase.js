import { useState} from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { purchaseProduct } from "../../services/productApi"
import { toast } from "react-toastify"

export const usePurchase = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const cart = location.state?.cart || []
    const [customerName, setCustomerName] = useState("")
  
    //kukunin yung cart data from useLocation
    const handlePurchase = async (e) => {
      e.preventDefault()
      if(!customerName.trim()) {
        toast.error('Please enter customer name')
        return
      }
  
        try {
          const response = await purchaseProduct({
            cart, // Send the entire cart sa backend
            customerName,
          })
          toast.success(`Purchase successful! Total amount: ₱${response.salesRecord.totalAmount.toFixed(2)}`)
          navigate('/list')
        } catch (error) {
          console.error("Error purchasing products:", error);
          console.error("Error purchasing product:", error)
        }
    }
  
    return { setCustomerName, handlePurchase, cart, customerName }
}

