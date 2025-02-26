import { useEffect, useState } from "react"
import { getTodaySales, getMonthlySales, getSalesHistory, deleteSales } from "../services/salesApi"

const SalesPage = () => {
    const [todaySales, setTodaySales] = useState(0)
    const [monthlySale, setMonthlySales] = useState(0)
    const [salesHistory, setSalesHistory] = useState([])

    useEffect(() => {
        fetchSalesData()
    }, [])

    const fetchSalesData = async () => {
        const today = await getTodaySales()
        const month = await getMonthlySales()
        const history = await getSalesHistory()

        // console.log("Today Sales:", today);
        // console.log("Monthly Sales:", month); 
        // console.log("Sales History:", history);

        setTodaySales(today.totalSales || 0)
        setMonthlySales(month.totalSales || 0)
        setSalesHistory(history.sales || [])
        
    }

    const handleDeleteSales = async () => {
        await deleteSales()
        fetchSalesData()
    }

  return (
    <div>
        <h2>Sales Report</h2>
        <p>Todays Sales: <strong>${todaySales}</strong></p>
        <p>Monthly Sales: <strong>${monthlySale}</strong></p>

        <button onClick={handleDeleteSales}>Delete All Sales</button>

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

export default SalesPage