import SearchBar from "../components/SearchBar"
import ProductModal from "../components/modals/customer details modal/ProductModal"
import { useSalesHistory } from "../hooks/sales history hooks/useSalesHistory"

const SalesHistory = () => {
    const { handleSearch, search, handleDetailsClick, selectedProducts, handleCloseModal } = useSalesHistory()
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