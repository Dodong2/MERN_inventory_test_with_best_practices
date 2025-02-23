import { useState } from "react"
import { createProduct } from "../services/Api"

const AddProduct = () => {
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

    const handleSubmit = async () => {
        try {
            await createProduct(product)
            alert("Product added successfully!")
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