import { useEffect, useState } from 'react'
import { getProducts } from '../services/productApi'
import { getTodaySales } from '../services/salesApi'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ProductList = () => {
    const [ products, setProducts] = useState([])
    const [ totalEarnings, setTotalEarnings ] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        fetchProducts()
        fetchTotalEarnings()
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

    // Get Total Earnings
    const fetchTotalEarnings = async () => {
        try {
            const data = await getTodaySales()
                setTotalEarnings(data.totalSales || 0)
        } catch(error) {
            console.error('Error fetching total earnings:', error)
        }
    }

  

    //validation kung zero stocks hindi makakabili
    const onPurchase = (product) => {
        if(product.quantity <= 0) {
            toast.error('Out of stock! Cannot proceed with purchase.', { position: 'top-right' })
            return
        }
        navigate(`/product/purchase/${product._id}`)
        fetchTotalEarnings();
    }

  return (
    <div>
        <h1>Invetory Management</h1>
        <h2>Total Earnings: {totalEarnings} PHP</h2>
        <button onClick={() => navigate('/add')}>add</button>
        <Link to='/sales'><button>View Sales report</button></Link>
        <Link to='/history'><button>View Sales history</button></Link><br/>
        <input type='text' placeholder='Search'/>
           {products.length > 0 ? (
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        {product.name} - {product.price} PHP - Stock: {product.quantity}
                        <button onClick={() => navigate(`/product/${product._id}`)}>Details</button>
                        <button onClick={() => onPurchase(product)}>purchase</button>
                        <button onClick={() => navigate(`/product/update/${product._id}`)}>Update</button>
                    </li>
                ))}
            </ul>
           ) : (
            <p>No product</p>
           )}
    </div>
  )
}

export default ProductList