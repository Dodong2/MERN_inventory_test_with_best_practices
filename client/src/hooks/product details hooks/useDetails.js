import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getProductById } from "../../services/productApi"

export const useDetails = () => {
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
    return {product}
}
