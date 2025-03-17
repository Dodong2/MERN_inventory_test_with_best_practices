import { useState, useEffect } from "react"
import { getTodaySales, getMonthlySales, getAllCustomer, getRecentSoldProducts } from "../../services/salesApi"

export const useSalesPage = () => {
    const [todaySales, setTodaySales] = useState(0)
    const [monthlySale, setMonthlySales] = useState(0)
    const [customerCount, setCustomerCount] = useState(0)
    const [recentSoldProducts, setRecentSoldProducts] = useState([])

    useEffect(() => {
        fetchSalesData()
        fetchCustomerCount()
        fetchRecentSold()
    }, [])

    const fetchSalesData = async () => {
        const today = await getTodaySales()
        const month = await getMonthlySales()

        // console.log("Today Sales:", today);
        // console.log("Monthly Sales:", month); 

        setTodaySales(today.totalSales || 0)
        setMonthlySales(month.totalSales || 0)
    }

    //get kung ilang customer
    const fetchCustomerCount = async() => {
        const count = await getAllCustomer()
        setCustomerCount(count.customerCount)
    }
    
    const fetchRecentSold = async() => {
        const recentSold = await getRecentSoldProducts()
        setRecentSoldProducts(recentSold.recentProducts)
        console.log(recentSold.recentProducts)
    }

return { todaySales, monthlySale, customerCount, recentSoldProducts }
}
