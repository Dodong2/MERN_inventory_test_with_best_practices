import { useState } from "react"
import { createProduct } from "../services/productApi"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        category: "",
        quantity: 0,
        price: 0,
        description: "",
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createProduct(product)
            toast.success("Product added successfuly")
            navigate('/')
        } catch(error) {
            console.error("Error adding product:", error)
        }
    }
  return (
    <>
        <div>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" onChange={handleChange} placeholder="name product" required/>
                <input type="text" name="category" onChange={handleChange} placeholder="category" required/>
                <input type="text" name="quantity" onChange={handleChange} placeholder="quantity" required/>
                <input type="text" name="price" onChange={handleChange} placeholder="price" required/>
                <textarea name="description" onChange={handleChange} placeholder="description" required/>
                <button type="submit">add product</button>
            </form>
        </div>
    </>
  )
}

export default AddProduct