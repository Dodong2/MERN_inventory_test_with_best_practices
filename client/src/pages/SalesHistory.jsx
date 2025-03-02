import { useEffect, useState } from "react"
import { getSalesHistory } from "../services/salesApi"
// import SearchBar from "../components/SearchBar"

const SalesHistory = () => {
//logics
    const [salesHistory, setSalesHistory] = useState([])
    // const [search, setSearch] = useState([])

    useEffect(() => {
        fetchSalesData()
    }, [])

//get Sales history
    const fetchSalesData = async() => {
        const history = await getSalesHistory()
        setSalesHistory(history.sales || [])
        // setSearch(history.sales || [])
    }
    
    // const handleSearch = (searchTerm) => {
    //     const filtered = salesHistory.filter(
    //         (sale) =>
    //             sale.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //             sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) 
    //     );
    //     setSearch(filtered);
    // };

  return (
    <div>
        {/* <SearchBar onSearch={handleSearch} placeholder="Search Product or Customer..." /> */}
        <h3>Sales History</h3>
        <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {salesHistory.length > 0 ? (
                        salesHistory.map((sale, index) => (
                            <tr key={index}>
                                <td>{sale.productName}</td>
                                <td>{sale.quantity}</td>
                                <td>{sale.totalPrice}</td>
                                <td>{sale.createdAt ? new Date(sale.createdAt).toLocaleString() : "No Date"}</td>
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
    </div>
  )
}

export default SalesHistory