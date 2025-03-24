import { useState, useEffect, useCallback } from "react";
import { getProducts } from "../../services/productApi";
import { getTodaySales } from "../../services/salesApi";

export const useProducts = () => {
    const [ products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [totalEarnings, setTotalEarnings] = useState(0)

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
    
    //for search
    const handleSearch = useCallback((searchTerm) => {
        const filtered = products.filter((product) => (
            product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        setFilteredProducts(filtered)
    }, [products])


    return { products, filteredProducts, handleSearch, totalEarnings }
}