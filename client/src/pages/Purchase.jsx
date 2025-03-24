    /* react lib */
    import React,{ useCallback } from 'react';
    import { useNavigate } from 'react-router-dom'
    import PropTypes from 'prop-types';
    /* react notif lib */
    import 'react-toastify/dist/ReactToastify.css'
    /* react icons */
    import { FaShoppingCart } from "react-icons/fa";
    /* components */
    import SearchBar from '../components/SearchBar'
    /* hooks */
    import { useProducts } from '../hooks/product lists hooks/useProducts'
    import { useCart } from '../hooks/product lists hooks/useCart'

    const Purchase = () => {
        const { filteredProducts, handleSearch } = useProducts()
        const { cart, addToCart, removeFromCart, adjustQuantity, toggleCart, isCartOpen, proceedToPurchase } = useCart()
        const navigate = useNavigate()
        //Memo
        const toggleCartMemo = useCallback(toggleCart, [toggleCart])
        const proceedToPurchaseMemo = useCallback(proceedToPurchase, [proceedToPurchase])

        

        return (
            <div>
                

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
            </div>
        )
    }

    //Memoized Product
    const ProductItem = ({ product, navigate, addToCart}) => (
        <li>
            {product.name} - ₱{product.price} - Stock: {product.quantity}
            <button onClick={() => navigate(`/product/${product._id}`)}>Details</button>
            <button onClick={() => addToCart(product)}>purchase</button>
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
    };

    const MemoizedProductItem = React.memo(ProductItem)

    export default React.memo(Purchase)     