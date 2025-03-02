import { useEffect, useState } from "react"
import { getSalesHistory } from "../services/salesApi"

const SalesHistory = () => {
//logics
    const [salesHistory, setSalesHistory] = useState([])

    useEffect(() => {
        fetchSalesData()
    }, [])

//get Sales history
    const fetchSalesData = async() => {
        const history = await getSalesHistory()
        setSalesHistory(history.sales || [])
    }

  return (
    <div>
        <input type='text' placeholder='Search'/>
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