import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

// get all product
export const getProducts = async () => {
    try {
        const response = await api.get('/')
        return response.data    
    } catch (error) {
        return error.response ? error.response.data : { message: 'An error occurred' }
    }
}
// get product by Id
export const getProductById = async (id) => {
    const response = await api.get(`/${id}`)
    return response.data
}

//create product
export const createProduct = async (productData) => {
    try {
        const response = await api.post('/', productData)
        return response.data    
    } catch(error) {
        return error.response ? error.response.data : { message: 'An error occurred' };
    }
}

// update product
export const updateProduct = async (id, updatedData) => {
    try {
        const response = await api.put(`/${String(id)}`, updatedData)
        return response.data
    } catch(error) {
        return error.response ? error.response.data : { message: 'An error occurred' };
    }
}

//Delete product
export const deleteProduct = async (id) => {
    // console.log("Deleting product with ID:", id); // Debugging step
    // if (!id) {
    //     return { message: "Invalid product ID" };
    // }
    try {
        const response = await api.delete(`/${id}`)
        return response.data
    } catch(error) {
        return error.response ? error.response.data : { message: 'An error occurred' };
    }
}

//purchase product
export const purchaseProduct = async (data) => {
    try  {
        const response = await api.post('/purchase', data)
        return response.data
    } catch(error) {
        return error.response ? error.response.data : { message: 'An error occurred' };
    }
}