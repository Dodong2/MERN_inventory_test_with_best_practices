import { useState, useEffect, useCallback, useMemo} from 'react'
import { getTopSalesPeryear } from '../../services/salesApi'

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "september", "October", "November", "December"
]

export const useTopSales = () => {
    const [salesData, setSalesData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)  

    const fetchSalesData = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const data = await getTopSalesPeryear()
            setSalesData(data)
        } catch (err) {
            console.error(err)
            setError("Failed to fetch sales data")
        } finally {
            setLoading(false)
        }   
    }, [])

    useEffect(() => {
        fetchSalesData()
    }, [fetchSalesData])

    const formattedData = useMemo(() => {
        return salesData.map((yearData) => ({
            year: yearData.year,
            labels: yearData.months.map((m) => monthNames[m.month - 1]),
            data: yearData.months.map((m) => m.totalSales),
        }))
    }, [salesData])

    return { formattedData, loading, error }
}