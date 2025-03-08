import { api } from "./Api";

export const getStockRecords = async (id) => {
    try {
        const response = await api.get(`/stock/${id}`)
        return response.data
    } catch(error) {
        return error.response ? error.response.data : { message: 'stock error' };
    }
} 