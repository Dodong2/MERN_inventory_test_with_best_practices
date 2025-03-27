import { Bar } from "react-chartjs-2";
import { useTopSales } from "../../hooks/graph Hooks/useTopSales";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopSalesChart = () => {
    const { formattedData, loading, error } = useTopSales()

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error: {error}</p>

    const chartData = {
        labels: formattedData.length ? formattedData[0].labels : [],
        datasets: formattedData.map((yearData) => ({
            label: `Top Sales Month`,
            data: yearData.data,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
        }))
    }
    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    }

  return <Bar data={chartData} options={options}/>
}

export default TopSalesChart