import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createProduct } from "../../services/productApi"
import { toast } from 'react-toastify'

export const useAdd = () => {
    const navigate = useNavigate()
    const [product, setProduct] = useState({
        name: "",
        category: "",
        quantity: 0,
        price: 0,
        description: "",
    })

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createProduct(product)
            toast.success("Product added successfuly")
            navigate('/list')
        } catch(error) {
            console.error("Error adding product:", error)
        }
    }
 return { handleChange, handleSubmit }
}
