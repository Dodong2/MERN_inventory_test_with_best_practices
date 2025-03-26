    /* react lib */
    import React,{ useCallback } from 'react';
    import { useNavigate } from 'react-router-dom'
    import PropTypes from 'prop-types';
    /* react notif lib */
    import 'react-toastify/dist/ReactToastify.css'
    /* react icons */
    /* components */
    import SearchBar from '../components/SearchBar'
    import PinModal from '../components/modals/PinModal'
    /* hooks */
    import { useProducts } from '../hooks/product lists hooks/useProducts'
    import { usePin } from '../hooks/product lists hooks/usePin'

    const ProductList = () => {
        const { filteredProducts, handleSearch } = useProducts()
        const { isPinModalOpen, isLoading, handlePinSubmit, handleAddClick, handleUpdateClick, setIsPinModalOpen, setAction } = usePin()
        const navigate = useNavigate()
        //Memo
        const handleAddClickMemo = useCallback(handleAddClick, [handleAddClick])
        const handleUpdateClickMemo = useCallback(handleUpdateClick, [handleUpdateClick])

        

        return (
            <div className="border ml-[14rem] mt-[3.5rem]">
                <h1>Invetory Management</h1>
                <button onClick={handleAddClickMemo}>add</button>

           

                <SearchBar placeholder='Search Product...' onSearch={handleSearch} />

                {filteredProducts.length > 0 ? (
                    <ul>
                        {filteredProducts.map((product) => (
                            <MemoizedProductItem 
                                key={product._id}
                                product={product}
                                navigate={navigate}
                                handleUpdateClick={handleUpdateClickMemo}
                                />
                        ))}
                    </ul>
                ) : (
                    <p>No product</p>
                )}

                {/* PIN Modal */}
                <PinModal isOpen={isPinModalOpen} onClose={() => { setIsPinModalOpen(false); setAction(null) }} onPinSubmit={handlePinSubmit} isLoading={isLoading} />
            </div>
        )
    }

    //Memoized Product
    const ProductItem = ({ product, navigate, handleUpdateClick}) => (
        <li>
            {product.name} - ₱{product.price} - Stock: {product.quantity}
            <button onClick={() => navigate(`/product/${product._id}`)}>Details</button>
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
        handleUpdateClick: PropTypes.func.isRequired
    };

    const MemoizedProductItem = React.memo(ProductItem)

    export default React.memo(ProductList) 