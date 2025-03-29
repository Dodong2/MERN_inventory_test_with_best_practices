/* react lib */
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';
/* react animation lib */
import { motion } from 'framer-motion';
/* react notif lib */
import 'react-toastify/dist/ReactToastify.css'
/* react icons */
import { TiShoppingCart } from "react-icons/ti";
import { IoMdCloseCircle } from "react-icons/io";


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
        <div className="ml-[14rem] mt-[3.5rem]">
            <div className='bg-[#F5F5F5]'>

                {/* search bar and cart */}
                <div className='flex items-center justify-between mt-20 mb-5'>
                    {/* Search bar */}
                    <SearchBar placeholder='Search Product...' onSearch={handleSearch} />

                    {/* Cart button */}
                    <div className='rounded-full mr-20'>
                        <button onClick={toggleCartMemo} className='relative'> <TiShoppingCart className='text-5xl text-blue-600 active:scale-95 transition-transform duration-75' />
                            {cart.length > 0 && (
                                <span className='absolute top-0 left-8 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs'>
                                    {cart.reduce((total, item) => total + item.quantity, 0)}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* product tables */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full divide-gray-200">
                        <thead className="bg-[#595959] text-white">
                            <tr>
                                <th className="text-center font-medium uppercase tracking-wider py-2">Product name</th>
                                <th className="text-center font-medium uppercase tracking-wider py-2">Price</th>
                                <th className="text-center font-medium uppercase tracking-wider py-2">Stocks</th>
                                <th className="text-center font-medium uppercase tracking-wider py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => (
                                    <MemoizedProductItem
                                        key={product._id}
                                        product={product}
                                        navigate={navigate}
                                        addToCart={addToCart}
                                        index={index}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-center">No product</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Cart Container */}
                <div>
                    <div>
                        {isCartOpen && (
                            <div className='fixed inset-0 bg-black/80  flex items-center justify-center z-50'>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    className="rounded-xl p-2 bg-[#00AEEF]"
                                >
                                    <main className=' bg-[#F5F5F5] p-6 shadow-2xl border-2 border-white/20 w-xl max-h-[23rem] overflow-auto'>
                                        <div className="flex align-center justify-between mb-4">
                                            <h2 className='text-xlg font-semibold text-[#00AEEF]'>Cart</h2>
                                            <button onClick={toggleCartMemo} className="text-lg text-[#1A1A1A] hover:text-blue-600 fixed ml-[30rem]">
                                                <IoMdCloseCircle />
                                            </button>
                                        </div>

                                        {/* cart products */}
                                        <div className='flex flex-col gap-2.5'>
                                        {cart.map((item, index) => (
                                            <section key={index} className={`${index % 2 === 0 ? 'bg-amber-200' : 'bg-blue-300'} rounded-sm p-2`}>
                                                <span className='flex items-center justify-between p-1'>
                                                    <li>{item.name}</li>
                                                    <button onClick={() => removeFromCart(item._id)}
                                                        className='p-1 bg-[#CF2945] rounded-sm text-white'
                                                    >remove</button>
                                                </span>
                                                <span className="flex items-center justify-between p-1">
                                                    <li>₱ {item.price} </li>
                                                    <div className="flex items-center justify-center gap-3">
                                                        <button
                                                            onClick={() => adjustQuantity(item._id, -1)}
                                                            className="p-1 w-8 h-8 bg-gray-600 text-center text-white rounded-lg flex items-center justify-center"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="font-semibold">{item.quantity}</span>
                                                        <button
                                                            onClick={() => adjustQuantity(item._id, 1)}
                                                            className="p-1 w-8 h-8 bg-blue-500 text-center text-white rounded-lg flex items-center justify-center"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </span>
                                            </section>
                                        ))}</div>
                                        <button onClick={proceedToPurchaseMemo}>Proceed to Purchase</button>
                                    </main>
                                </motion.div>
                                        
                            </div>
                            
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

//Memoized Product
const ProductItem = ({ product, navigate, addToCart, index }) => (
    <tr className={`${index % 2 === 0 ? "bg-blue-100 " : ""} hover:bg-red-100`}>
        <td className='text-center py-2 whitespace-nowrap font-semibold'>{product.name}</td>
        <td className='text-center py-2 whitespace-nowrap font-semibold'>₱ {product.price}</td>
        <td className='py-2 text-center whitespace-nowrap font-semibold'>{product.quantity}</td>
        <td className='flex justify-center gap-1.5 py-2'>
            <button onClick={() => navigate(`/product/${product._id}`)}
                className="bg-[#616983] hover:bg-[#1A1A1A] text-white font-medium py-1 px-3 rounded mr-1 active:scale-95 transition-transform duration-75"
            >Details</button>
            <button onClick={() => addToCart(product)}
                className="bg-[#00AEEF] hover:bg-[#FB002A] text-white font-medium py-1 px-3 rounded mr-1 active:scale-95 transition-transform duration-75"
            >purchase</button>
        </td>
    </tr>
)

ProductItem.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
    }).isRequired,
    navigate: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired

};

const MemoizedProductItem = React.memo(ProductItem)

export default React.memo(Purchase)     