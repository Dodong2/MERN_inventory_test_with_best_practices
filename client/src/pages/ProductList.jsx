/* react lib */
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
/* react notif lib */
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
/* services */
import { getProducts } from '../services/productApi'
import { getTodaySales } from '../services/salesApi'
/* components */
import SearchBar from '../components/SearchBar'

const ProductList = () => {
    const [ products, setProducts] = useState([])
    const [ totalEarnings, setTotalEarnings ] = useState(0)
    const [filteredProducts, setFilteredProducts] = useState([])
    const [cart, setCart] = useState([])
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
            setFilteredProducts(data.products)
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

    // pang add to cart with validation kung zero stocks hindi makakabili
    const addToCart = (product) => {
        if(product.quantity <= 0) {
            toast.error('Out of stock! Cannot proceed with purchase.', { position: 'top-right' })
            return
        }
        setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
        //ito ay pang add lang if incase na pundutin yung purchase
        // const existingProduct = cart.find(item => item._id === product._id);
        // if (existingProduct) {
        //     setCart(prevCart =>
        //         prevCart.map(item =>
        //             item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        //         )
        //     );
        // } else {
        //     setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
        // }
    }
  
    //para sa purchase
    const proceedToPurchase = () => {
        navigate(`/product/purchase`, { state: { cart } })
    }

    //para makapag remove ng Items sa cart
    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item._id !== productId))
    }
    // para makapag dagdag kung ilan bibilhin
    const adjustQuantity = (productId, amount) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item._id === productId ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
            )
        );
    };

    // //validation kung zero stocks hindi makakabili
    // const onPurchase = (product) => {
    //     if(product.quantity <= 0) {
    //         toast.error('Out of stock! Cannot proceed with purchase.', { position: 'top-right' })
    //         return
    //     }
    //     navigate(`/purchase/${product._id}`)
    //     fetchTotalEarnings();
    // }

    //for search
    const handleSearch = (searchTerm) => {
        const filtered = products.filter((product) => (
            product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        setFilteredProducts(filtered)
    }

  return (
    <div>
        <h1>Invetory Management</h1>
        <h2>Total Earnings: {totalEarnings} PHP</h2>
        <button onClick={() => navigate('/add')}>add</button>
        <Link to='/sales'><button>View Sales report</button></Link>
        <Link to='/history'><button>View Sales history</button></Link><br/>
        <SearchBar placeholder='Search Product...' onSearch={handleSearch}/>
           {filteredProducts.length > 0 ? (
            <ul>
                {filteredProducts.map((product) => (
                    <li key={product._id}>
                        {product.name} - ₱{product.price} - Stock: {product.quantity}
                        <button onClick={() => navigate(`/product/${product._id}`)}>Details</button>
                        <button onClick={() => addToCart(product)}>purchase</button>
                        <button onClick={() => navigate(`/product/update/${product._id}`)}>Update</button>
                    </li>
                ))}
            </ul>
           ) : (
            <p>No product</p>
           )}

           {/* Cart Container */}
           <div>
            <h1>Cart</h1>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        <p>{item.name} - ₱{item.price} x {item.quantity}</p>
                        <button onClick={() => adjustQuantity(item._id, -1)}>-</button>
                        <button onClick={() => adjustQuantity(item._id, 1)}>+</button>
                        <button onClick={() => removeFromCart(item._id)}>Remove</button>
                    </li>
                ))}
            </ul>

            {cart.length > 0 && (
                    <button onClick={proceedToPurchase}>Proceed to Purchase</button>
            )}
           </div>
    </div>
  )
}

export default ProductList