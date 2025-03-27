import { useState, useEffect } from "react"
import { getTodaySales, getMonthlySales, getAllCustomer, getRecentSoldProducts, getLastMonthSales, getRecentCustomer } from "../../services/salesApi"

export const useOverview = () => {
    const [todaySales, setTodaySales] = useState(0)
    const [monthlySale, setMonthlySales] = useState(0)
    const [customerCount, setCustomerCount] = useState(0)
    const [recentSoldProducts, setRecentSoldProducts] = useState([])
    const [lastMonth, setLastMonth] = useState([])
    const [recentCustomerName, setRecentCustomerName] = useState([])

    useEffect(() => {
        fetchSalesData()
        fetchCustomerCount()
        fetchRecentSold()
        fetchLastMonth()
        fetchRecentCustomer()
    }, [])

    //get lahat ng today at monthly sales
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

    //get lahat ng recent na sold na products
    const fetchRecentSold = async() => {
        const recentSold = await getRecentSoldProducts()
        setRecentSoldProducts(recentSold.recentProducts)
    }

    // Get yung Last Month Sales
    const fetchLastMonth = async() => {
        const lastMonthSale = await getLastMonthSales()
        setLastMonth(lastMonthSale)
    }

    const fetchRecentCustomer = async() => {
        const recentCustomers = await getRecentCustomer()
        setRecentCustomerName(recentCustomers.recentCustomer)
    }

return { todaySales, monthlySale, customerCount, recentSoldProducts, lastMonth, recentCustomerName }
}
