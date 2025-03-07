import { useEffect, useState } from "react"
import { getSalesHistory } from "../services/salesApi"
import SearchBar from "../components/SearchBar"
import ProductModal from "../components/modals/customer details modal/ProductModal"

const SalesHistory = () => {
//logics
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


  return (
    <div>
        <SearchBar onSearch={handleSearch} placeholder="Search Product or Customer..." />
        <h3>Sales History</h3>
        <table>
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Total Price</th>
                        <th>Date</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {search.length > 0 ? (
                        search.map((sale, index) => (
                            <tr key={index}>
                                <td>{sale.customerName}</td>
                                <td>₱{sale.totalAmount}</td>
                                <td>{sale.createdAt ? new Date(sale.createdAt).toLocaleString() : "No Date"}</td>
                                <td><button onClick={() => handleDetailsClick(sale)}>Details</button></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                        <td>
                            No Sales History
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
            {selectedProducts && (
                <ProductModal sale={selectedProducts} onClose={handleCloseModal}/>
            )}
    </div>
  )
}

export default SalesHistory