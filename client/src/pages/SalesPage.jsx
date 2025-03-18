import { useSalesPage } from "../hooks/sales page hooks/useSalesPage"

const SalesPage = () => {
  const { todaySales, monthlySale, customerCount, recentSoldProducts, lastMonth } = useSalesPage()    

  return (
    <div>
        <h2>Sales Report</h2>
        <p>Todays Sales: <strong>₱{todaySales}</strong></p>
        <p>Monthly Sales: <strong>₱{monthlySale}</strong></p>
        <p>customer today: {customerCount}</p>
        <h2>Recent Sold Products</h2>
        {/* recent sold products */}
        {recentSoldProducts.map((product, index) => (
          <li key={index}>
            {product.productName} {product.quantity} pcs
          </li>
        ))}

        {/* last month sales */}
        
            <p>{lastMonth.month}</p>
            <p>{lastMonth.totalSales}</p>
            <p>{lastMonth.totalCustomer}</p>
       
        
    </div>
  )
}

export default SalesPage