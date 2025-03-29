import { useOverview } from "../hooks/overview hooks/useOverview"
import TopSalesChart from "../components/charts/TopSales.Chart"
/* Icons */
import { TbCurrencyPeso } from "react-icons/tb";
import { IoMdPeople } from "react-icons/io";


const Overview = () => {
  const { todaySales, monthlySale, customerCount, recentSoldProducts, lastMonth, recentCustomerName } = useOverview()


  return (
    <div className="ml-[14rem] mt-[3.5rem]">
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-4 flex flex-col gap-4">
          {/* sales report */}
          <div className="bg-[#FFFFFF] p-4 border border-gray-300 rounded-lg h-54 hover:border-blue-400 drop-shadow-sm">
            <div className="bg-gray-100 p-3 rounded-2xl text-2xl w-12"><TbCurrencyPeso /></div>
            <h2 className="text-center font-bold text-blue-400">Sales Report</h2>
            <p className="text-sm">Todays Sales:</p> <strong className="text-red-600 text-2xl ml-5">₱ {todaySales}</strong>
            <p className="text-sm">Monthly Sales: </p> <strong className="text-2xl ml-5">₱ {monthlySale}</strong>
          </div>

          {/* customer today */}
          <div className="col-span-2 h-33 bg-[#FFFFFF] border border-gray-300 p-4 rounded-lg hover:border-red-400 drop-shadow-sm">
            <div className="bg-gray-100 p-3 rounded-2xl text-2xl w-12"><IoMdPeople /></div>
            <p className="text-sm">customer today:</p> <strong className="text-2xl">{customerCount}</strong>
          </div>
        </div>
        {/* sales chart para makita anong month pinakamataas na sales */}
        <div className="col-span-8 bg-[#FFFFFF] border border-gray-300 p-4 rounded-lg hover:border-blue-400 drop-shadow-sm">
          <TopSalesChart />
        </div>

        {/* recent sold products */}
        <div className="col-span-6 bg-[#FFFFFF] border border-gray-300 p-4 rounded-lg hover:border-red-400 drop-shadow-sm">
          <h2 className="font-bold text-xl text-blue-400">Recent Sold Products</h2>
          <table className="w-full">
            <thead className="border-b border-gray-400">
              <tr>
                <th className="text-left font-bold py-1">Product</th>
                <th className="text-left font-bold py-1">Stock</th>  
              </tr>
            </thead>
            <tbody>
              {recentSoldProducts.map((product, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-blue-100 " : ""}>
                  <td className="p-1 border-none text-sm">{product.productName}</td>
                  <td className="p-1 border-none text-sm">{product.quantity} pcs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* last month sales */}
        <div className="col-span-4 bg-gray-100 p-4 rounded-lg hidden">
          <p>{lastMonth.month}</p>
          <p>{lastMonth.totalSales}</p>
          <p>{lastMonth.totalCustomer}</p>
        </div>

        {/* recent customer name */}
        <div className="col-span-6 bg-[#FFFFFF] border border-gray-300 p-4 rounded-lg hover:border-blue-400 drop-shadow-sm">
          <h2 className="font-bold text-xl text-blue-400">recent customers</h2>
          <table className="w-full">
          <thead className="border-b border-gray-400">
              <tr>
                <th className="text-left font-bold py-1">Customer's name</th>
              </tr>
            </thead>
            <tbody>
          {recentCustomerName.map((customer, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-blue-100 " : ""}>
              <td className="p-1 border-none text-sm">{customer.customerName}</td>
            </tr>
          ))}
          </tbody>
          </table>
        </div>


      </div>
    </div>
  )
}

export default Overview