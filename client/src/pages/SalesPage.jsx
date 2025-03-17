import { useSalesPage } from "../hooks/sales page hooks/useSalesPage"

const SalesPage = () => {
  const { todaySales, monthlySale, customerCount, recentSoldProducts } = useSalesPage()    

  return (
    <div>
        <h2>Sales Report</h2>
        <p>Todays Sales: <strong>₱{todaySales}</strong></p>
        <p>Monthly Sales: <strong>₱{monthlySale}</strong></p>
        <p>customer today: {customerCount}</p>
        <h2>Recent Sold Products</h2>
        {recentSoldProducts.map((product, index) => (
          <li key={index}>
            {product.productName} {product.quantity} pcs
          </li>
        ))}
    </div>
  )
}

export default SalesPage