import { useSalesPage } from "../hooks/sales page hooks/useSalesPage"

const SalesPage = () => {
  const { todaySales, monthlySale } = useSalesPage()    

  return (
    <div>
        <h2>Sales Report</h2>
        <p>Todays Sales: <strong>${todaySales}</strong></p>
        <p>Monthly Sales: <strong>${monthlySale}</strong></p>
    </div>
  )
}

export default SalesPage