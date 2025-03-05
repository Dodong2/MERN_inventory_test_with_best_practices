import { api } from "./Api";

/* products */
// get all product
export const getProducts = async () => {
    try {
        const response = await api.get('/products')
        return response.data    
    } catch (error) {
        return error.response ? error.response.data : { message: 'An error occurred' }
    }
}
// get product by Id
export const getProductById = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'An error occurred' };
    }
}

//create product
export const createProduct = async (productData) => {
    try {
        const response = await api.post('/products', productData)
        return response.data    
    } catch(error) {
        return error.response ? error.response.data : { message: 'An error occurred' };
    }
}

// update product
export const updateProduct = async (id, updatedData) => {
    try {
        const response = await api.put(`/products/${String(id)}`, updatedData)
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
        const response = await api.delete(`/products/${id}`)
        return response.data
    } catch(error) {
        return error.response ? error.response.data : { message: 'An error occurred' };
    }
}

//purchase product
export const purchaseProduct = async (data) => {
    try  {
        const response = await api.post('/products/purchase', data)
        return response.data
    } catch(error) {
        return error.response ? error.response.data : { message: 'An error occurred' };
    }
}