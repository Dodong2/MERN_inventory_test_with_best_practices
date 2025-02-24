import { useEffect, useState } from 'react'
import { getProducts, deleteProduct } from '../services/Api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ProductList = () => {
    const [ products, setProducts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchProducts()
    }, [])

    //Get Products
    const fetchProducts = async () => {
        try {
            const data = await getProducts()
            setProducts(data.products)
        } catch(error) {
            console.error('Error fetching products:', error)
        }
    }
    //Delete Products
    const handleDelete = async (productId) => {
        try {
            await deleteProduct(productId)
            fetchProducts()
        } catch(error) {
            console.error('Error Delete products', error)
        }
    }

    const onPurchase = (product) => {
        if(product.quantity <= 0) {
            toast.error('Out of stock! Cannot proceed with purchase.', { position: 'top-right' })
            return
        }
        navigate(`/product/purchase/${product._id}`)
    }

  return (
    <div>
        <h1>Invetory Management</h1>
        <button onClick={() => navigate('/add')}>add</button>
           {products.length > 0 ? (
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        {product.name} - {product.price} PHP - Stock: {product.quantity}
                        <button onClick={() => handleDelete(product._id)}>Delete</button>
                        <button onClick={() => navigate(`/product/${product._id}`)}>Details</button>
                        <button onClick={() => onPurchase(product)}>purchase</button>
                        <button onClick={() => navigate(`/product/update/${product._id}`)}>Update</button>
                    </li>
                ))}
            </ul>
           ): (
            <p>No product</p>
           )}
    </div>
  )
}

export default ProductList