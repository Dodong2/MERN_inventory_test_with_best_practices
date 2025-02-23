import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProductById } from "../services/Api"

const ProductDetails = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        fetchProduct()
    }, [])

    const fetchProduct = async () => {
        try {
            const data = await getProductById(id)
            setProduct(data)
        } catch(error) {
            console.error("Error fetching product:", error)
        }
    }
  return (
    <>
        <div>
            <h1>product details</h1>
            {product ? (
                <div>
                    <p>Name: {product.name}</p>
                    <p>Category: {product.category}</p>
                    <p>Price: {product.price}</p>
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