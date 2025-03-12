import { useState, useEffect } from "react";
import { getSalesHistory } from "../../services/salesApi";

export const useSalesHistory = () => {
    const [salesHistory, setSalesHistory] = useState([])
    const [search, setSearch] = useState([])
    const [selectedProducts, setSelectedProducts] = useState(null)

        useEffect(() => {
            fetchSalesData()
        }, [])
    
    //get Sales history
        const fetchSalesData = async() => {
            try {
                const history = await getSalesHistory()
                setSalesHistory(history.sales || [])
                setSearch(history.sales || [])
                // console.log(history)
            } catch (error) {
                console.error("Error fetching sales history:", error)
            }
        }
        
        const handleSearch = (searchTerm) => {
            const filtered = salesHistory.filter(
                (sale) =>
                    (sale.customerName && sale.customerName.toLowerCase().includes(searchTerm.toLowerCase())) 
            );
            setSearch(filtered);
        };
    
    // pang bukas ng modal
        const handleDetailsClick = (sale) => {
            setSelectedProducts(sale)
        }
    
        const handleCloseModal = () => {
            setSelectedProducts(null)
        }
        
    return { salesHistory, search, selectedProducts, handleSearch, handleDetailsClick, handleCloseModal }
}