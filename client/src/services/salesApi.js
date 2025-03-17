import { api } from "./Api";

/* Sales */

//Get yung total sales for today
export const getTodaySales = async () => {
    try {
        const response = await api.get('/sales/today')
        return response.data
    } catch(error) {
        return error.response ? error.response.data : { message: 'An error occurred' }
    }
}

//Get yung total sales sa current month
export const getMonthlySales = async() => {
    try {
        const response = await api.get('/sales/month')
        return response.data
    } catch(error) {
        console.error(error)
        return error.response ? error.response.data : { message: 'An error occurred' }
    }
}

//Get yung sales history
export const getSalesHistory = async() => {
    try {
        const response = await api.get('/sales/history')
        return response.data
    } catch(error) {
        console.error(error)
        return error.response ? error.response.data : { message: 'An error occurred' } 
    }
}

//Delete yung lahat ng sales
export const deleteSales = async ()=> {
    try {
        const response = await api.delete('/sales/delete')
        return response.data
    } catch(error) {
        return error.response ? error.response.data : { message: 'An error occurred' }
    }
}

//Get all customers
export const getAllCustomer = async() => {
    try {
        const response = await api.get('/sales/customers')
        return response.data
    } catch(error) {
        console.error(error)
        return error.response ? error.response.data : { message: 'An error occurred' } 
    }
}

//Get all recent sold product
export const getRecentSoldProducts = async() => {
    try {
        const response = await api.get('sales/recent')
        return response.data
    } catch(error) {
        console.error(error)
        return error.response ? error.response.data : { message: 'An error occurred' } 
    }
}