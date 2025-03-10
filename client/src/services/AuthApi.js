import { api } from "./Api";

export const LoginAuth = async(email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password })
        return response.data
    } catch(error) {
        return error.response ? error.response.data : { message: 'An error occurred' };
    }
}