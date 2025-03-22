/* react lib */
import { useNavigate, Link } from 'react-router-dom'
/* react notif lib */
import 'react-toastify/dist/ReactToastify.css'
/* react icons */
import { FaShoppingCart } from "react-icons/fa";
/* components */
import SearchBar from '../components/SearchBar'
import PinModal from '../components/modals/PinModal'
/* hooks */
import { useProducts } from '../hooks/product lists hooks/useProducts'
import { useCart } from '../hooks/product lists hooks/useCart'
import { usePin } from '../hooks/product lists hooks/usePin'

const ProductList = () => {
    const { products, filteredProducts, handleSearch, totalEarnings } = useProducts()
    const { cart, addToCart, removeFromCart, adjustQuantity, toggleCart, isCartOpen, proceedToPurchase } = useCart()
    const { isPinModalOpen, isLoading, handlePinSubmit, handleAddClick, handleUpdateClick, setIsPinModalOpen, setAction } = usePin()
    const navigate = useNavigate()

    

    return (
        <div>
            <h1>Invetory Management</h1>
            <h2>Total Earnings: {totalEarnings} PHP</h2>
            <button onClick={handleAddClick}>add</button>
            <Link to='/sales'><button>View Sales report</button></Link>
            <Link to='/history'><button>View Sales history</button></Link><br />

            {/* Cart button */}
            <button onClick={toggleCart} className='cart-button'> <FaShoppingCart />
                {cart.length > 0 && (
                    <span className='icon-cart-holder'>
                        {cart.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                )}
            </button>

            <SearchBar placeholder='Search Product...' onSearch={handleSearch} />

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
                {isCartOpen && (
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index}>
                                <p>{item.name} - ₱{item.price} x {item.quantity}</p>
                                <button onClick={() => adjustQuantity(item._id, -1)}>-</button>
                                <button onClick={() => adjustQuantity(item._id, 1)}>+</button>
                                <button onClick={() => removeFromCart(item._id)}>Remove</button>
                            </li>
                        ))}
                                <button onClick={proceedToPurchase}>Proceed to Purchase</button>

                    </ul>
                )}

            </div>

            {/* PIN Modal */}
            <PinModal isOpen={isPinModalOpen} onClose={() => { setIsPinModalOpen(false); setAction(null) }} onPinSubmit={handlePinSubmit} isLoading={isLoading} />
        </div>
    )
}

export default ProductList