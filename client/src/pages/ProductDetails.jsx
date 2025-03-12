import { useDetails } from "../hooks/product details hooks/useDetails"

const ProductDetails = () => {
    const { product } = useDetails()
    
  return (
    <>
        <div>
            <h1>product details</h1>
            {product ? (
                <div>
                    <p>Name: {product.name}</p>
                    <p>Category: {product.category}</p>
                    <p>Price: {product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Description: {product.description}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    </>
  )
}

export default ProductDetails