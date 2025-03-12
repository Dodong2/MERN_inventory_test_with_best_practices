import { api } from "./Api";

export const forgetPassword = async(pin) => {
    try {
        const response = await api.post('/auth/forget', { pin })
        return response.data
    } catch(error) {
        return error.response ? error.response.data : { message: 'Error validating PIN:' };
        // return { success: false, message: "Invalid PIN" };    
    }
}