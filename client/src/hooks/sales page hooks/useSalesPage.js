import { useState, useEffect } from "react"
import { getTodaySales, getMonthlySales } from "../../services/salesApi"

export const useSalesPage = () => {
    const [todaySales, setTodaySales] = useState(0)
    const [monthlySale, setMonthlySales] = useState(0)

    useEffect(() => {
        fetchSalesData()
    }, [])

    const fetchSalesData = async () => {
        const today = await getTodaySales()
        const month = await getMonthlySales()

        // console.log("Today Sales:", today);
        // console.log("Monthly Sales:", month); 

        setTodaySales(today.totalSales || 0)
        setMonthlySales(month.totalSales || 0)
    }
return { todaySales, monthlySale }
}
