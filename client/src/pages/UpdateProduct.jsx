import { useState, useEffect } from "react"
import { updateProduct, getProductById, deleteProduct } from "../services/productApi"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { getStockRecords } from "../services/stockRecordApi"

const UpdateProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [stockRecord, setStockRecord] = useState([])
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
                const records = await getStockRecords(id)
                setStockRecord(records)
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
            toast.success("Product updated successfully!")
            navigate('/list')
        } catch(error) {
            console.error("Error updating product:", error);
        }
    }

        //Delete Products
        const handleDelete = async () => {
            if(window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id)
                navigate('/list')
            } catch(error) {
                console.error('Error Delete products', error)
            }
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
        <button onClick={() => handleDelete()}>Delete</button>

         {/* Display Stock Records */}
         <h3>Stock Update History</h3>
            <ul>
                {stockRecord.map((record, index) => (
                    <li key={index}>
                        {new Date(record.timestamp).toLocaleString()} - Added: {record.quantityAdded}
                    </li>
                ))}
            </ul>
    </>
  )
}

export default UpdateProduct