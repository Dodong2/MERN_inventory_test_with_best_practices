import { useEffect, useState } from 'react'
import { getProducts, deleteProduct } from '../services/Api'

const ProductList = () => {
    const [ products, setProducts] = useState([])

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
  return (
    <div>
        <h1>Invetory Management</h1>
           {products.length > 0 ? (
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        {product.name} - {product.price} PHP - Stock: {product.quantity}
                        <button onClick={() => handleDelete(product._id)}>Delete</button>
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