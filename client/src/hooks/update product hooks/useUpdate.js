import { useState, useEffect } from "react"
import { getProductById, updateProduct, deleteProduct } from "../../services/productApi"
import { getStockRecords } from "../../services/stockRecordApi"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'

export const useUpdate = () => {
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
    return { product ,handleUpdate, handleChange, handleDelete, stockRecord }
}
