import { useOverview } from "../hooks/overview hooks/useOverview"
import TopSalesChart from "../components/charts/TopSales.Chart"
/* para makuha yung recent name ng customer */

const Overview = () => {
  const { todaySales, monthlySale, customerCount, recentSoldProducts, lastMonth, recentCustomerName } = useOverview()


  return (
    <div className="ml-[14rem] mt-[3.5rem]">
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-4 flex flex-col gap-4">
        {/* sales report */}
        <div className=" bg-[#FFFFFF] p-4 border border-gray-300 rounded-lg h-48 hover:border-blue-400 drop-shadow-sm">
          <h2 className="text-lg font-semibold">Sales Report</h2>
          <p>Todays Sales: <strong className="text-red-600">₱{todaySales}</strong></p>
          <p>Monthly Sales: <strong>₱{monthlySale}</strong></p>
        </div>
          {/* customer today */}
          <div className="col-span-2 h-30 bg-[#FFFFFF] border border-gray-300 p-4 rounded-lg flex items-center justify-center hover:border-red-400 drop-shadow-sm">
          <p>customer today: {customerCount}</p>
        </div>
        </div>
        {/* sales chart para makita anong month pinakamataas na sales */}
        <div className="col-span-8 bg-[#FFFFFF] border border-gray-300 p-4 rounded-lg hover:border-blue-400 drop-shadow-sm">
          <TopSalesChart />
        </div>

        {/* recent sold products */}
        <div className="col-span-6 bg-[#FFFFFF] border border-gray-300 p-4 rounded-lg hover:border-red-400 drop-shadow-sm">
        <h2>Recent Sold Products</h2>
        {recentSoldProducts.map((product, index) => (
          <li key={index}>
            {product.productName} {product.quantity} pcs
          </li>
        ))}
        </div>

        

        {/* last month sales */}
        <div className="col-span-4 bg-gray-100 p-4 rounded-lg hidden">
          <p>{lastMonth.month}</p>
          <p>{lastMonth.totalSales}</p>
          <p>{lastMonth.totalCustomer}</p>
        </div>

        {/* recent customer name */}
        <div className="col-span-6 bg-[#FFFFFF] border border-gray-300 p-4 rounded-lg hover:border-blue-400 drop-shadow-sm">
        <h2>recent customers</h2>
        {recentCustomerName.map((customer, index) => (
          <ul key={index}>
            <li>{customer.customerName}</li>
          </ul>
        ))}
        </div>


      </div>
    </div>
  )
}

export default Overview