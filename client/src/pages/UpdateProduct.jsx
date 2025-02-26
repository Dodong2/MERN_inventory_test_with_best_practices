import { useState, useEffect } from "react"
import { updateProduct, getProductById } from "../services/productApi"
import { useParams, useNavigate } from "react-router-dom"

const UpdateProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState({
        name:"",
        price: "",
        quantity: "",
        description: "",
    })

    // fetch product details
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id)
                setProduct({
                    name: data.name,
                    price: data.price,
                    quantity: data.quantity,
                    description: data.description
                })
            } catch(error) {
                console.error("Error fetching product:", error);
            }
        }
        fetchProduct()
    }, [id])

    //handle form change
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    //handle update
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            await updateProduct(id, product)
            navigate('/')
        } catch(error) {
            console.error("Error updating product:", error);
        }
    }

  return (
    <>
        <form onSubmit={handleUpdate}>
            <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Name" required/>
            <input type="text" name="price" value={product.price} onChange={handleChange} placeholder="Price" required/>
            <input type="text" name="quantity" value={product.quantity} onChange={handleChange} placeholder="Quantity" required/>
            <input type="text" name="description" value={product.description} onChange={handleChange} placeholder="description" required/>
            <button type="submit">Update</button>
        </form>
    </>
  )
}

export default UpdateProduct