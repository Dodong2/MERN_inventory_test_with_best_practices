/* react lib */
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
/* react notif lib */
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
/* services */
import { getProducts } from '../services/productApi'
import { getTodaySales } from '../services/salesApi'
import { validatePIN } from '../services/pin'
/* components */
import SearchBar from '../components/SearchBar'
import PinModal from '../components/modals/PinModal'

const ProductList = () => {
    const [ products, setProducts] = useState([])
    const [ totalEarnings, setTotalEarnings ] = useState(0)
    const [filteredProducts, setFilteredProducts] = useState([])
    const [cart, setCart] = useState([])
    const [isPinModalOpen, setIsPinModalOpen] = useState(false)
    const [selectedProductId, setSelectedProductId] = useState(null); // Track selected product ID
    const [isLoading, setIsLoading] = useState(false)
    const [action, setAction] = useState(null)
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
// kung yung product ay out of stocks hindi makakabili
        if(product.quantity <= 0) {
            toast.error('Out of stock! Cannot proceed with purchase.', { position: 'top-right' })
            return
        }

// kung yung product ay existing nasa loob ng cart
        if (cart.some((item) => item._id === product._id)) {
            toast.error('Product is already in the cart.', { position: 'top-right' });
            return;
        }
        setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
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

    //for search
    const handleSearch = (searchTerm) => {
        const filtered = products.filter((product) => (
            product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        setFilteredProducts(filtered)
    }

// para sa PIN Submit
    const handlePinSubmit = async (pin) => {
        setIsLoading(true)
        try {
            const isValid = await validatePIN(pin) // Call the backend API to validate PIN
            if(isValid.success) {
                if(action === 'update') {
                   navigate(`/product/update/${selectedProductId}`) // Redirect to update page
                } else if (action === 'add') {
                    navigate('/add')
                }    
            } else {
                toast.error('Invalid PIN. Please try again.', { position: 'top-right' })
            }
        } catch (error) {
            console.error('Error validating PIN:', error)
            toast.error('An error occurred. Please try again.', { position: 'top-right' });
        } finally {
            setIsLoading(false)
        }
    }

// para sa pag open ng PIN modal sa update
    const handleUpdateClick = (productId) => {
        setSelectedProductId(productId)
        setAction('update')
        setIsPinModalOpen(true)
    }

// para sa pag open ng PIN modal sa add
    const handleAddClick = () => {
        setAction('add')
        setIsPinModalOpen(true)
    }


  return (
    <div>
        <h1>Invetory Management</h1>
        <h2>Total Earnings: {totalEarnings} PHP</h2>
        <button onClick={handleAddClick}>add</button>
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
                        <button onClick={() => handleUpdateClick(product._id)}>Update</button>
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
           {/* PIN Modal */}
           <PinModal isOpen={isPinModalOpen} onClose={() => {setIsPinModalOpen(false); setAction(null)}} onPinSubmit={handlePinSubmit} isLoading={isLoading}/>
    </div>
  )
}

export default ProductList