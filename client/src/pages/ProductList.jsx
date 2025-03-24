    /* react lib */
    import React,{ useCallback } from 'react';
    import { useNavigate, Link } from 'react-router-dom'
    import PropTypes from 'prop-types';
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
        const { filteredProducts, handleSearch, totalEarnings } = useProducts()
        const { cart, addToCart, removeFromCart, adjustQuantity, toggleCart, isCartOpen, proceedToPurchase } = useCart()
        const { isPinModalOpen, isLoading, handlePinSubmit, handleAddClick, handleUpdateClick, setIsPinModalOpen, setAction } = usePin()
        const navigate = useNavigate()
        //Memo
        const handleAddClickMemo = useCallback(handleAddClick, [handleAddClick])
        const handleUpdateClickMemo = useCallback(handleUpdateClick, [handleUpdateClick])
        const toggleCartMemo = useCallback(toggleCart, [toggleCart])
        const proceedToPurchaseMemo = useCallback(proceedToPurchase, [proceedToPurchase])

        

        return (
            <div>
                <h1>Invetory Management</h1>
                <h2>Total Earnings: {totalEarnings} PHP</h2>
                <button onClick={handleAddClickMemo}>add</button>
                <Link to='/sales'><button>View Sales report</button></Link>
                <Link to='/history'><button>View Sales history</button></Link><br />

                {/* Cart button */}
                <button onClick={toggleCartMemo} className='cart-button'> <FaShoppingCart />
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
                            <MemoizedProductItem 
                                key={product._id}
                                product={product}
                                navigate={navigate}
                                addToCart={addToCart}
                                handleUpdateClick={handleUpdateClickMemo}
                                />
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
                                <button onClick={proceedToPurchaseMemo}>Proceed to Purchase</button>
                        </ul>
                    )}

                </div>

                {/* PIN Modal */}
                <PinModal isOpen={isPinModalOpen} onClose={() => { setIsPinModalOpen(false); setAction(null) }} onPinSubmit={handlePinSubmit} isLoading={isLoading} />
            </div>
        )
    }

    //Memoized Product
    const ProductItem = ({ product, navigate, addToCart, handleUpdateClick}) => (
        <li>
            {product.name} - ₱{product.price} - Stock: {product.quantity}
            <button onClick={() => navigate(`/product/${product._id}`)}>Details</button>
            <button onClick={() => addToCart(product)}>purchase</button>
            <button onClick={() => handleUpdateClick(product._id)}>Update</button>
        </li>
    )

    ProductItem.propTypes = {
        product: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            quantity: PropTypes.number.isRequired
        }).isRequired,
        navigate: PropTypes.func.isRequired,
        addToCart: PropTypes.func.isRequired,
        handleUpdateClick: PropTypes.func.isRequired
    };

    const MemoizedProductItem = React.memo(ProductItem)

    export default React.memo(ProductList) 